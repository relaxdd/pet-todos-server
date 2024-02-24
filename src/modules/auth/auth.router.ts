import { Router } from 'express'
import checkBodyIsJson from '../../middlewares/checkBodyIsJson'
import { validateLogin } from './auth.middlewares'
import AuthController from './auth.controller'

const authRouter = Router()

authRouter.post('/login', checkBodyIsJson, validateLogin, AuthController.login)
authRouter.get('/logout', AuthController.logout)

export default authRouter
