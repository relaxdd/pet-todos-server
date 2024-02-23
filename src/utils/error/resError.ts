import { Response } from 'express'

type ResObject = Record<string, any> & { message: string }

export const UNEXPECTED_ERR = 'Unexpected Api Error'

export const STATUS_TEXTS = {
  200: 'OK',
  201: 'Created',
  400: 'Bad Request',
  401: 'Not Authorized',
  403: 'Access Denied',
  404: 'Not Found',
  500: 'Internal Server Error',
} as const

function resError(res: Response, code: number, { message, ...data }: ResObject) {
  return res.status(code).json({
    statusCode: code,
    error: STATUS_TEXTS?.[code as keyof typeof STATUS_TEXTS] || UNEXPECTED_ERR,
    message, data
  })
}

export default resError
