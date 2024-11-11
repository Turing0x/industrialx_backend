"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserControllers = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const send_res_1 = require("../../../helpers/send.res");
const user_models_1 = require("../domain/user.models");
async function getAllUsers(req, res) {
    try {
        const users = await user_models_1.UserModel.find();
        return (0, send_res_1.goodResponse)(res, 'crud_mess_0', users);
    }
    catch (error) {
        return (0, send_res_1.badResponse)(res, 'mess_0', error.message);
    }
}
async function getUserById(req, res) {
    try {
        const { id } = req.params;
        if (!id)
            return (0, send_res_1.badResponse)(res, 'mess_1');
        const user = await user_models_1.UserModel.findById(id);
        if (!user)
            return (0, send_res_1.badResponse)(res, 'user_mess_8');
        return (0, send_res_1.goodResponse)(res, 'crud_mess_0', user);
    }
    catch (error) {
        return (0, send_res_1.badResponse)(res, 'mess_0', error.message);
    }
}
async function saveUser(req, res) {
    try {
        const user = req.body;
        const exist = await user_models_1.UserModel.findOne({ ci: user.phone });
        if (exist) {
            return (0, send_res_1.badResponse)(res, 'user_mess_7');
        }
        const hashPassword = bcrypt_1.default.hashSync(user.password, 10);
        user.password = hashPassword;
        const newuser = new user_models_1.UserModel(user);
        await newuser.save();
        return (0, send_res_1.goodResponse)(res, 'user_mess_1');
    }
    catch (error) {
        return (0, send_res_1.badResponse)(res, 'mess_0', error.message);
    }
}
async function sign(req, res) {
    try {
        const { username, password } = req.body;
        const user = await user_models_1.UserModel.findOne({ name: username });
        if (!user)
            return (0, send_res_1.badResponse)(res, 'user_mess_8', '', 401);
        const compare = bcrypt_1.default.compareSync(password, user.password);
        if (!compare)
            return (0, send_res_1.badResponse)(res, 'server_mess_4', '', 401);
        const token = jsonwebtoken_1.default.sign({ username: user.username, user_id: user._id, status: user.status }, process.env.JWT_KEY_APP, { expiresIn: '1d' });
        return (0, send_res_1.goodResponse)(res, 'server_mess_3', {
            user: user._id,
            token,
        });
    }
    catch (error) {
        console.log(error);
        return (0, send_res_1.badResponse)(res, 'mess_0', error.message);
    }
}
async function editUserEnable(req, res) {
    try {
        const { status } = req.body;
        const id = req.params.id;
        await user_models_1.UserModel.findOneAndUpdate({ _id: id }, {
            $set: { status }
        });
        return (0, send_res_1.goodResponse)(res, 'user_mess_3');
    }
    catch (error) {
        return (0, send_res_1.badResponse)(res, 'mess_0', error.message);
    }
}
async function editUser(req, res) {
    try {
        const user = req.body;
        const { id } = req.params;
        const product = await user_models_1.UserModel.findById(id);
        if (!product)
            return (0, send_res_1.badResponse)(res, 'product_mess_8');
        await user_models_1.UserModel.findByIdAndUpdate(id, user);
        return (0, send_res_1.goodResponse)(res, 'user_mess_3');
    }
    catch (error) {
        return (0, send_res_1.badResponse)(res, 'user_mess_4', error.message);
    }
}
async function resetPassword(req, res) {
    try {
        const { id } = req.query;
        const password = await bcrypt_1.default.hash('0000', 10);
        user_models_1.UserModel.updateOne({ _id: id }, { $set: { password } })
            .then(() => { return (0, send_res_1.goodResponse)(res, 'user_mess_9'); })
            .catch((err) => { return (0, send_res_1.badResponse)(res, 'user_mess_10', err.message); });
    }
    catch (error) {
        return (0, send_res_1.badResponse)(res, 'mess_0', error.message);
    }
}
async function changePassword(req, res) {
    try {
        const { actualPass } = req.body;
        let { newPass } = req.body;
        const existingUser = await user_models_1.UserModel.findOne({ _id: res['userData']['user_id'] })
            .select('password');
        bcrypt_1.default.compare(actualPass, existingUser.password, async (err, result) => {
            if (!result) {
                return (0, send_res_1.badResponse)(res, 'user_mess_12', '');
            }
            if (err) {
                return (0, send_res_1.badResponse)(res, 'user_mess_12', '');
            }
            newPass = await bcrypt_1.default.hash(newPass, 10);
            user_models_1.UserModel.updateOne({ _id: res['userData']['user_id'] }, { $set: { password: newPass } })
                .then(() => { return (0, send_res_1.goodResponse)(res, 'user_mess_11'); })
                .catch((err) => { return (0, send_res_1.badResponse)(res, 'user_mess_12', err); });
        });
    }
    catch (error) {
        return (0, send_res_1.badResponse)(res, 'mess_0', error.message);
    }
}
async function deleteUserById(req, res) {
    try {
        const { id } = req.params;
        if (!id)
            return (0, send_res_1.badResponse)(res, 'mess_1');
        await user_models_1.UserModel.deleteOne({ _id: id });
        return (0, send_res_1.goodResponse)(res, 'user_mess_5', '');
    }
    catch (error) {
        return (0, send_res_1.badResponse)(res, 'mess_0', error.message);
    }
}
async function tokenVerify(req, res) {
    try {
        const token = req.headers['access-token'];
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_KEY_APP);
        const user = await user_models_1.UserModel.findOne({ username: decoded['username'] });
        const newToken = jsonwebtoken_1.default.sign({ username: user.username, user_id: user._id, status: user.status }, process.env.JWT_KEY_APP, { expiresIn: '1d' });
        return (0, send_res_1.goodResponse)(res, 'server_mess_50', {
            user: {
                userID: user._id,
                role: user.role.toLocaleLowerCase()
            },
            token: newToken,
        });
    }
    catch (error) {
        return (0, send_res_1.badResponse)(res, 'mess_0', error.message);
    }
}
exports.UserControllers = {
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
};
//# sourceMappingURL=user.controller.js.map