import { celebrate, Joi } from 'celebrate'

export interface ValidateUserId {
  userId: number
}

export interface ValidateGetOneTodo {
  id: number
}

export interface ValidateCreateTodo {
  title: string
}

export const validateUserId = celebrate({
  query: Joi.object<ValidateUserId>({
    userId: Joi.number().positive().min(1).required()
  })
})

export const validateGetOneTodo = celebrate({
  params: Joi.object<ValidateGetOneTodo>({
    id: Joi.number().positive().min(1).required()
  })
})

export const validateCreateTodo = celebrate({
  body: Joi.object<ValidateCreateTodo, true>({
    title: Joi.string().required()
  })
})
