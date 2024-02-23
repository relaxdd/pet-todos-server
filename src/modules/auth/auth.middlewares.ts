import { celebrate } from 'celebrate'
import { loginSchema, registerSchema } from './auth.schemes'

export const validateRegister = celebrate({ body: registerSchema })
export const validateLogin = celebrate({ body: loginSchema })
