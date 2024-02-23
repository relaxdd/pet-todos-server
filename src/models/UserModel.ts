import { db } from '../index'
import { UserItem } from '../types'

class TodoModel {
  public static async loadAll() {
    const [rows] = await db.query('SELECT * FROM `users`')
    return rows as UserItem[]
  }

  public static async findByLogin(login: string) {
    const [rows] = await db.query('SELECT * FROM `users` WHERE login = ?', [login]) as any[]
    if (!rows.length) return null
    return (rows as UserItem[])[0]!
  }
}

export default TodoModel
