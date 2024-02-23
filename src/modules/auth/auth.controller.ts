import { NextFunction, Request, Response } from 'express'
import { LoginSchema, RegisterSchema } from './auth.schemes'
import UserModel from '../../models/UserModel'
import bcryptjs from 'bcryptjs'
import JwtService from '../../services/JwtService'
import resError from '../../utils/error/resError'
import { COOKIE_AUTH_KEY } from '../../defines'

class AuthController {
  public static async register(req: Request<never, never, RegisterSchema>, res: Response, next: NextFunction) {
    try {
      return res.json(req.body)
    } catch (err) {
      return next(err)
    }
  }

  public static async login(req: Request<never, never, LoginSchema>, res: Response, next: NextFunction) {
    try {
      const { user_password, user_login } = req.body
      const user = await UserModel.findByLogin(user_login)

      if (!user) {
        const message = 'Пользователь с таким логином не найден'
        return resError(res, 400, { message, fields: ['user_login'] })
      }

      const verify = await bcryptjs.compare(user_password, user.password)

      if (!verify) {
        const message = 'Введен не верный пароль'
        return resError(res, 400, { message, fields: ['user_password'] })
      }

      const { password, ...userDto } = user
      const jwt = JwtService.sign(userDto)

      res.cookie(COOKIE_AUTH_KEY, jwt, {
        httpOnly: true,
        sameSite: 'lax',
        maxAge: 1000 * 60 * 60 * 24 * 7
      })

      return res.end()
    } catch (err) {
      return next(err)
    }
  }

  public static async logout(req: Request, res: Response, next: NextFunction) {
    try {
      return res.end()
    } catch (err) {
      return next(err)
    }
  }
}

export default AuthController

