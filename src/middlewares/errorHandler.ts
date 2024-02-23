import { NextFunction, Request, Response } from 'express'
import { ValidationError } from 'joi'
import ApiError from '../utils/error/ApiError'
import resError from '../utils/error/resError'

function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  let { message } = err

  if (err instanceof ValidationError) {
    return res.status(400).json({
      message, data: err.details,
    })
  }

  if (err instanceof ApiError) {
    return resError(res, err.status, {
      type: 'ApiError',
      message, data: err.data,
    })
  }

  return resError(res, 500, {
    type: err?.constructor?.name || 'Error',
    message: err.message,
  })
}

export default errorHandler
