import { NextFunction, Response } from 'express'
import TodoModel, { GetAllTodosWithParamsPayload } from '../../models/TodoModel'
import { ValidateCreateTodo, ValidateGetAllTodos, ValidateIdParamTodo, ValidateUpdateTodo } from './todo.middlewares'
import { RequestWithUser } from '../../utils/checkAuth'
import resError from '../../utils/error/resError'

class TodoController {
  public static async getAll(
    req: RequestWithUser<never, never, never, ValidateGetAllTodos>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const userId = req.user!.id

      if (!Object.keys(req.query).length) {
        const todos = await TodoModel.loadAll(+userId)
        return res.json(todos)
      } else {
        const {
          _page = 1,
          _per_page = 10,
          _sort_by = 'id',
          _order_by = 'asc'
        } = req.query

        const payload: GetAllTodosWithParamsPayload = {
          limit: _per_page,
          sort: _sort_by,
          order: _order_by,
          offset: _per_page * (_page - 1)
        }

        const data = await TodoModel.loadAllWithParams(userId, payload)

        if (!data.items.length) {
          const message = 'Такой страницы не существует'
          return resError(res, 404, { message })
        }

        res.setHeader('X-Total-Count', data.total)

        return res.json(data.items)
      }
    } catch (err) {
      return next(err)
    }
  }

  public static async getOne(
    req: RequestWithUser<ValidateIdParamTodo>,
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

  public static async updateOne(
    req: RequestWithUser<ValidateIdParamTodo, never, ValidateUpdateTodo>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const todoId = req.params.id!
      const userId = req.user!.id

      await TodoModel.updateOne(userId, todoId, req.body)

      return res.end()
    } catch (err) {
      return next(err)
    }
  }

  public static async deleteOne(
    req: RequestWithUser<ValidateIdParamTodo, never, ValidateUpdateTodo>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const todoId = req.params.id!
      const userId = req.user!.id

      await TodoModel.deleteOne(userId, todoId)

      return res.end()
    } catch (err) {
      return next(err)
    }
  }
}

export default TodoController
