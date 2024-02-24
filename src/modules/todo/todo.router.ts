import { Router } from 'express'
import TodoController from './todo.controller'
import { checkAuth } from '../../utils/checkAuth'
import { validateCreateTodo, validateGetAllTodos, validateIdParamTodo, validateUpdateTodo } from './todo.middlewares'
import checkBodyIsJson from '../../middlewares/checkBodyIsJson'

const todoRouter = Router()

todoRouter.use(checkAuth)

todoRouter.get('/', validateGetAllTodos, TodoController.getAll)
todoRouter.get('/:id', validateIdParamTodo, TodoController.getOne)
todoRouter.post('/', checkBodyIsJson, validateCreateTodo, TodoController.addOne)
todoRouter.patch('/:id', validateIdParamTodo, checkBodyIsJson, validateUpdateTodo, TodoController.updateOne)
todoRouter.delete('/:id', validateIdParamTodo, TodoController.deleteOne)

export default todoRouter
