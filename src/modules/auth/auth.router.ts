import { Router } from 'express'
import checkBodyIsJson from '../../middlewares/checkBodyIsJson'
import { validateLogin, validateRegister } from './auth.middlewares'
import AuthController from './auth.controller'

const authRouter = Router()

authRouter.post('/register', checkBodyIsJson, validateRegister, AuthController.register)
authRouter.post('/login', checkBodyIsJson, validateLogin, AuthController.login)

export default authRouter
