import { NextFunction, Request, Response } from 'express'
import { JwtPayload } from 'jsonwebtoken'
import { UserDto } from '../types'
import * as core from 'express-serve-static-core'
import { COOKIE_AUTH_KEY } from '../defines'
import resError from './error/resError'
import JwtService from '../services/JwtService'

export type JwtPayloadWithUser = JwtPayload & UserDto

export type RequestWithUser<
  P = core.ParamsDictionary,
  ResBody = any,
  ReqBody = any,
  ReqQuery = core.Query,
  Locals extends Record<string, any> = Record<string, any>,
> = Request<P, ResBody, ReqBody, ReqQuery, Locals> & { user?: JwtPayloadWithUser }

export async function checkAuth(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> {
  function notAuthFn() {
    const message = 'Вы не авторизированны!'
    return resError(res, 401, { message })
  }

  const token = req.cookies?.[COOKIE_AUTH_KEY]
  if (!token) return notAuthFn()

  const payload = JwtService.verify(token) as JwtPayloadWithUser | false
  if (payload === false) return notAuthFn();

  (req as RequestWithUser)['user'] = payload
  next()
}
