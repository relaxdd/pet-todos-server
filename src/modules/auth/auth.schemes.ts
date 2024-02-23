import { Joi } from 'celebrate'

export interface RegisterSchema {
  user_login: string
  user_email: string
  user_password: string
  user_confirm: string
}

export interface LoginSchema {
  user_login: string
  user_password: string
}

const fieldsSchema = {
  password: Joi.string().min(8).max(24).required(),
}

export const registerSchema = Joi.object<RegisterSchema, true>({
  user_login: Joi.string().required(),
  user_email: Joi.string().required(),
  user_password: fieldsSchema.password,
  user_confirm: fieldsSchema.password,
})

export const loginSchema = Joi.object<LoginSchema, true>({
  user_login: Joi.string().required(),
  user_password: fieldsSchema.password,
})
