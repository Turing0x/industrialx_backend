import { Response, Request } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { goodResponse, badResponse } from '../../../helpers/send.res';
import { User } from '../models/user.model';
import { UserModel } from '../domain/user.models';

async function getAllUsers(req: Request, res: Response) {

  try {
    const users = await UserModel.find()
    return goodResponse(res, 'crud_mess_0', users)
  } catch (error) { return badResponse(res, 'mess_0', error.message) }

}

async function getUserById (req: Request, res: Response) {
  
  try {
    
    const { id } = req.params;
    if( !id ) return badResponse(res, 'mess_1'); 
  
    const user = await UserModel.findById(id);
    if (!user) return badResponse(res, 'user_mess_8'); 
    
    return goodResponse(res, 'crud_mess_0', user);

  } catch (error) { return badResponse(res, 'mess_0', error.message) }

}

async function saveUser(req: Request, res: Response) {
  
  try {

    const user: User = req.body;
    const exist = await UserModel.findOne({ ci: user.phone })

    if (exist) {
      return badResponse(res, 'user_mess_7');
    }

    const hashPassword = bcrypt.hashSync(user.password, 10);
    user.password = hashPassword;
  
    const newuser = new UserModel(user);
    await newuser.save();
  
    return goodResponse(res, 'user_mess_1');
    
  } catch (error) {
    return badResponse(res, 'mess_0', error.message)
  }

}

async function sign(req: Request, res: Response) {

  try {

    const { username, password } = req.body;
  
    const user = await UserModel.findOne({ name: username });
    if (!user) return badResponse(res, 'user_mess_8', '', 401);
    
    const compare = bcrypt.compareSync(password, user.password);
    if (!compare) return badResponse(res, 'server_mess_4', '', 401);
  
    const token = jwt.sign(
      { username: user.username, user_id: user._id, status: user.status },
      process.env.JWT_KEY_APP,
      { expiresIn: '1d' }
    )
  
    return goodResponse(res, 'server_mess_3', {
      user: user._id,
      token,
    });
    
  } catch (error) {
    console.log(error);
    return badResponse(res, 'mess_0', error.message)
  }

}

async function editUserEnable(req: Request, res: Response) {
  
  try {

    const { status } = req.body
    const id = req.params.id

    await UserModel.findOneAndUpdate({ _id: id }, {
      $set: {status}
    })

    return goodResponse(res, 'user_mess_3')

  } catch (error) { return badResponse(res, 'mess_0', error.message) }

}

async function editUser(req: Request, res: Response) {
  
  try {
    
    const user = req.body;
    const { id } = req.params;
  
    const product = await UserModel.findById(id)
    if (!product) return badResponse(res, 'product_mess_8'); 
  
    await UserModel.findByIdAndUpdate(id, user)
  
    return goodResponse(res, 'user_mess_3');
    
  } catch (error) { return badResponse(res, 'user_mess_4', error.message) }

}

async function resetPassword(req: Request, res: Response) {

  try {

    const { id } = req.query

    const password = await bcrypt.hash('0000', 10)

    UserModel.updateOne({_id: id}, { $set: { password } })
      .then(() => { return goodResponse(res, 'user_mess_9') })
      .catch((err) => { return badResponse(res, 'user_mess_10', err.message) })

  } catch (error) { return badResponse(res, 'mess_0', error.message) }

}

async function changePassword(req: Request, res: Response) {

  try {

    const { actualPass } = req.body
    let { newPass } = req.body
    const existingUser = await UserModel.findOne({ _id: res['userData']['user_id'] })
      .select('password')

    bcrypt.compare(actualPass, existingUser.password, async (err, result) => {
      if (!result) { return badResponse(res, 'user_mess_12', '') }

      if (err) { return badResponse(res, 'user_mess_12', '') }

      newPass = await bcrypt.hash(newPass, 10)

      UserModel.updateOne({ _id: res['userData']['user_id'] }, { $set: { password: newPass } })
        .then(() => { return goodResponse(res, 'user_mess_11') })
        .catch((err) => { return badResponse(res, 'user_mess_12', err) })
    })

  } catch (error) {
    return badResponse(res, 'mess_0', error.message)
  }

}

async function deleteUserById(req: Request, res: Response) {
  
  try {
    
    const { id } = req.params;
    if( !id ) return badResponse(res, 'mess_1'); 
  
    await UserModel.deleteOne({ _id: id })
    
    return goodResponse(res, 'user_mess_5', '');

  } catch (error) { return badResponse(res, 'mess_0', error.message) }

}

async function tokenVerify(req: Request, res: Response) {
  
  try {

    const token: string = req.headers['access-token'] as string
    const decoded = jwt.verify(token, process.env.JWT_KEY_APP) as object

    const user = await UserModel.findOne({ username: decoded['username'] });
    const newToken = jwt.sign(
      { username: user.username, user_id: user._id, status: user.status },
      process.env.JWT_KEY_APP,
      { expiresIn: '1d' }
    )

    return goodResponse(res, 'server_mess_50', {
      user: {
        userID: user._id,
        role: user.role.toLocaleLowerCase()
      },
      token: newToken,
    });

  } catch (error) { return badResponse(res, 'mess_0', error.message) }

}

export const UserControllers = {
  deleteUserById,
  editUserEnable,
  changePassword,
  resetPassword,
  getUserById,
  getAllUsers,
  tokenVerify,
  editUser,
  saveUser,
  sign
}