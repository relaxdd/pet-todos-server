import { Router } from 'express'
import { checkIsJson, validateLogin, validateRegister } from './auth.middlewares'
import AuthController from './auth.controller'

const authRouter = Router()

authRouter.post('/register', checkIsJson, validateRegister, AuthController.register)
authRouter.post('/login', checkIsJson, validateLogin, AuthController.login)

export default authRouter
