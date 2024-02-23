import { NextFunction, Response } from 'express'
import TodoModel from '../../models/TodoModel'
import { ValidateCreateTodo, ValidateGetOneTodo } from './todo.middlewares'
import { RequestWithUser } from '../../utils/checkAuth'
import resError from '../../utils/error/resError'

class TodoController {
  public static async getAll(req: RequestWithUser, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.id
      const todos = await TodoModel.loadAll(+userId)

      return res.json(todos)
    } catch (err) {
      return next(err)
    }
  }

  public static async getOne(
    req: RequestWithUser<Partial<ValidateGetOneTodo>>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const userId = req.user!.id
      const todoId = req.params.id!
      const todo = await TodoModel.loadOne(userId, todoId)

      if (!todo) {
        return resError(res, 404, { message: 'Элемент задачи не найден' })
      }

      return res.json(todo)
    } catch (err) {
      return next(err)
    }
  }

  public static async addOne(
    req: RequestWithUser<never, never, ValidateCreateTodo>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const title = req.body.title
      const user_id = req.user!.id

      const todo = await TodoModel.createOne({ user_id, title })
      return res.json(todo)
    } catch (err) {
      return next(err)
    }
  }
}

export default TodoController
