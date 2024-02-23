import { Router } from 'express'
import TodoController from './todo.controller'
import { validateUserId } from './todo.middlewares'

const todoRouter = Router()

todoRouter.get('/', validateUserId, TodoController.getAll)
todoRouter.get('/:id', validateUserId, TodoController.getOne)

export default todoRouter
