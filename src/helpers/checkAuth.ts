import jwt from 'jsonwebtoken';

import { badResponse } from './send.res';
import { Request, Response, NextFunction } from 'express';
import { UserModel } from '../api/User/domain/user.models';

export async function checkAuth (req: Request, res: Response, next: NextFunction) {
  try {
    const token: string = req.headers['access-token'] as string
    const decoded = jwt.verify(token, process.env.JWT_KEY_APP) as object

    const { status, role } = await UserModel.findOne({ _id: decoded['user_id'] })
      .select(['_id', 'username', 'status', 'role'])
      .populate('role')

    if (status) {
      res['userData'] = { role, ...decoded }
      return next()
    }

  } catch (error) { return badResponse(res, 'server_mess_5', error.message, 401) }
}
