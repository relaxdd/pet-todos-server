import { NextFunction, Request, Response } from 'express'
import { LoginSchema, RegisterSchema } from './auth.schemes'
import UserModel from '../../models/UserModel'
import bcryptjs from 'bcryptjs'

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
        const error = 'Пользователь с таким логином не найден'
        return res.status(400).json({ error })
      }

      const verify = await bcryptjs.compare(user_password, user.password)

      if (!verify) {
        const error = 'Введен не верный пароль'
        return res.status(400).json({ error })
      }

      // res.cookie('_auth_mysql_is_ready', user.id)
      const { password, ...user_dto } = user

      return res.json(user_dto)
    } catch (err) {
      return next(err)
    }
  }
}

export default AuthController

