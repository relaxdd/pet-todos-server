import { Router } from 'express'
import TodoController from './todo.controller'
import { checkAuth } from '../../utils/checkAuth'
import { validateCreateTodo, validateGetOneTodo } from './todo.middlewares'
import checkBodyIsJson from '../../middlewares/checkBodyIsJson'

const todoRouter = Router()

todoRouter.use(checkAuth)

todoRouter.get('/', TodoController.getAll)
todoRouter.get('/:id', validateGetOneTodo, TodoController.getOne)
todoRouter.post('/', checkBodyIsJson, validateCreateTodo, TodoController.addOne)
todoRouter.patch('/:id')
todoRouter.delete('/:id')

export default todoRouter
