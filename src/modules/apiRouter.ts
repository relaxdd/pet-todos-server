import { Router } from 'express'
import NotFoundError from '../utils/error/NotFoundError'
import authRouter from './auth/auth.router'
import todoRouter from './todo/todo.router'

const apiRouter = Router()

apiRouter.use('/auth', authRouter)
apiRouter.use('/todos', todoRouter)

apiRouter.all('*', (req, res, next) => {
  next(new NotFoundError('Неверный адрес api запроса!'))
})

export default apiRouter
