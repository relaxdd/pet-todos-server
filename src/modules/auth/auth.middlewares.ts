import checkContentType from '../../middlewares/checkContentType'
import { celebrate } from 'celebrate'
import { loginSchema, registerSchema } from './auth.schemes'

export const checkIsJson = checkContentType('application/json', true)
export const validateRegister = celebrate({ body: registerSchema })
export const validateLogin = celebrate({ body: loginSchema })
