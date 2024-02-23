import { db } from '../index'
import { TodoItem } from '../types'

class TodoModel {
  public static async loadAll(userId: number) {
    const [rows] = await db.query('SELECT * FROM `todos` WHERE `user_id` = ? ', [userId])
    return rows as TodoItem[]
  }
}

export default TodoModel
