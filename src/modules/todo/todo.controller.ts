import { NextFunction, Request, Response } from 'express'
import TodoModel from '../../models/TodoModel'
import { ValidateUserId } from './todo.middlewares'

class TodoController {
  public static async getAll(
    req: Request<never, never, ValidateUserId>,
    res: Response,
    next: NextFunction
  ) {
    try {
      // const userId = req.cookies?.['_auth_mysql_is_ready']
      const { userId } = req.query

      if (!userId) {
        const error = 'Вы не авторизованны'
        return res.status(401).json({ error })
      }

      const todos = await TodoModel.loadAll(+userId)
      return res.json(todos)
    } catch (err) {
      return next(err)
    }
  }

  public static async getOne(
    req: Request<never, never, ValidateUserId>,
    res: Response,
    next: NextFunction
  ) {
    try {
      return res.end()
    } catch (err) {
      return next(err)
    }
  }
}

export default TodoController
