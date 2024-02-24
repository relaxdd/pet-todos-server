import { celebrate, Joi } from 'celebrate'
import { TodoItem } from '../../types'

export type GetAllTodosWithParamsSortByKeys = keyof Omit<TodoItem, 'user_id'>
export type GetAllTodosWithParamsOrderByKeys = 'asc' | 'desc'

type OnlyKeysObject<T extends keyof any> = Readonly<Record<T, string>>

const allowSortByKeys: OnlyKeysObject<GetAllTodosWithParamsSortByKeys> = {
  id: '',
  title: '',
  completed: '',
  created_at: ''
}

const allowOrderByKeys: OnlyKeysObject<GetAllTodosWithParamsOrderByKeys> = {
  asc: '',
  desc: ''
}

export interface ValidateIdParamTodo {
  id?: number
}

export interface ValidateCreateTodo {
  title: string
}

export type ValidateUpdateTodo = Pick<TodoItem, 'title' | 'completed'>

export interface ValidateGetAllTodos {
  _page?: number,
  _per_page?: number,
  _sort_by?: GetAllTodosWithParamsSortByKeys,
  _order_by?: GetAllTodosWithParamsOrderByKeys
}

export const validateGetAllTodos = celebrate({
  query: Joi.object<ValidateGetAllTodos, true>({
    _page: Joi.number().positive().min(1).optional(),
    _per_page: Joi.number().positive().min(1).optional(),
    _sort_by: Joi.string().allow(...Object.keys(allowSortByKeys)).optional(),
    _order_by: Joi.string().allow(...Object.keys(allowOrderByKeys)).optional(),
  })
})

export const validateIdParamTodo = celebrate({
  params: Joi.object<ValidateIdParamTodo>({
    id: Joi.number().positive().min(1).required()
  })
})

export const validateCreateTodo = celebrate({
  body: Joi.object<ValidateCreateTodo, true>({
    title: Joi.string().required()
  })
})

export const validateUpdateTodo = celebrate({
  body: Joi.object<ValidateUpdateTodo, true>({
    title: Joi.string().required(),
    completed: Joi.boolean().required()
  })
})
