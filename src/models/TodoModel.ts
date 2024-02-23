import { db } from '../index'
import { TodoItem, TodoPayload } from '../types'
import ApiError from '../utils/error/ApiError'
import { UNEXPECTED_ERR } from '../utils/error/resError'

class TodoModel {
  public static async loadAll(userId: number) {
    const [rows] = await db.query('SELECT * FROM `todos` WHERE `user_id` = ? ', [userId])
    return rows as TodoItem[]
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
}

export default TodoModel


