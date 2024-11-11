"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRouter = void 0;
const express_1 = require("express");
const user_controller_1 = require("./infraesctructure/user.controller");
const router = (0, express_1.Router)();
router
    .get('/', user_controller_1.UserControllers.getAllUsers)
    .get('/:id', user_controller_1.UserControllers.getUserById)
    .post('/', user_controller_1.UserControllers.saveUser)
    .post('/signin', user_controller_1.UserControllers.sign)
    .post('/resetpass', user_controller_1.UserControllers.resetPassword)
    .post('/changePassword', user_controller_1.UserControllers.changePassword)
    .post('/tokenVerify', user_controller_1.UserControllers.tokenVerify)
    .put('/:id', user_controller_1.UserControllers.editUser)
    .put('/changeEnable/:id', user_controller_1.UserControllers.editUserEnable)
    .delete('/:id', user_controller_1.UserControllers.deleteUserById);
exports.UserRouter = router;
//# sourceMappingURL=user.router.js.map