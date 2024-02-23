import { celebrate, Joi } from 'celebrate'

export interface ValidateUserId {
  userId: number
}

export const validateUserId = celebrate({
  query: Joi.object<ValidateUserId>({
    userId: Joi.number().positive()
  })
})
