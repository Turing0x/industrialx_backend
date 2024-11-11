import { Router } from 'express';

import { UserControllers } from './infraesctructure/user.controller';

const router = Router()

router

  .get('/', UserControllers.getAllUsers)
  .get('/:id', UserControllers.getUserById)

  .post('/', UserControllers.saveUser)
  .post('/signin', UserControllers.sign)
  .post('/resetpass', UserControllers.resetPassword)
  .post('/changePassword', UserControllers.changePassword)
  .post('/tokenVerify', UserControllers.tokenVerify)

  .put('/:id', UserControllers.editUser)
  .put('/changeEnable/:id', UserControllers.editUserEnable)

  .delete('/:id', UserControllers.deleteUserById)

export const UserRouter = router
