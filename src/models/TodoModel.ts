import { db } from '../index'
import { TodoItem, TodoPayload } from '../types'
import ApiError from '../utils/error/ApiError'
import { UNEXPECTED_ERR } from '../utils/error/resError'
import {
  GetAllTodosWithParamsOrderByKeys,
  GetAllTodosWithParamsSortByKeys,
  ValidateUpdateTodo
} from '../modules/todo/todo.middlewares'

export interface GetAllTodosWithParamsPayload {
  limit: number,
  offset: number,
  order: GetAllTodosWithParamsOrderByKeys
  sort: GetAllTodosWithParamsSortByKeys,
}

type SqlResultCount = [[{ count: number }]]

class TodoModel {
  public static async loadAll(userId: number) {
    const [rows] = await db.query('SELECT * FROM `todos` WHERE `user_id` = ?', [userId])
    return rows as TodoItem[]
  }

  public static async loadAllWithParams(userId: number, params: GetAllTodosWithParamsPayload) {
    const query1 = 'SELECT COUNT(*) as "count" FROM `todos` WHERE `user_id` = ?'
    const [[{ count }]] = await db.query(query1, [userId]) as unknown as SqlResultCount
    const { limit, offset, sort, order } = params

    const [rows] = await (async () => {
      if (sort === 'id' && order === 'asc') {
        const query = 'SELECT * FROM `todos` WHERE `user_id` = ? LIMIT ? OFFSET ?'
        return db.query(query, [userId, limit, offset])
      }

      const cases = ['asc', 'desc'] as const
      const sortEsc = db.escapeId(sort)
      const orderUpp = (cases.includes(order) ? order : cases[1]).toUpperCase()
      const query = `SELECT *
                     FROM \`todos\`
                     WHERE \`user_id\` = ?
                     ORDER BY ${sortEsc} ${orderUpp}
                     LIMIT ? OFFSET ?`

      return db.query(query, [userId, limit, offset])
    })()

    return {
      total: count || 0,
      items: rows as TodoItem[]
    }
  }

  public static async loadOne(userId: number, todoId: number) {
    const [rows] = await db.query('SELECT * FROM `todos` WHERE `user_id` = ? AND `id` = ?', [userId, todoId])
    return (rows as TodoItem[])?.[0] || null
  }

  public static async createOne({ user_id, title }: TodoPayload) {
    const [result] = await db.query('INSERT INTO `todos` (user_id, title) VALUES (?, ?)', [user_id, title])
    const todoId = (result as any)?.['insertId'] || 0

    if (!todoId) {
      const error = 'Не удалось создать или найти новый элемент задачи'
      throw new ApiError(UNEXPECTED_ERR, 500, { error })
    }

    const find = await TodoModel.loadOne(user_id, todoId)

    if (!find) {
      const error = 'Не удалось создать или найти новый элемент задачи'
      throw new ApiError(UNEXPECTED_ERR, 500, { error })
    }

    return find
  }

  public static async updateOne(userId: number, todoId: number, { title, completed }: ValidateUpdateTodo) {
    const query = 'UPDATE `todos` SET `title` = ?, `completed` = ? WHERE `id` = ? AND `user_id` = ?'
    await db.query(query, [title, completed, todoId, userId])
  }

  public static async deleteOne(userId: number, todoId: number) {
    await db.query('DELETE FROM `todos` WHERE `id` = ? AND `user_id` = ?', [todoId, userId])
  }
}

export default TodoModel


