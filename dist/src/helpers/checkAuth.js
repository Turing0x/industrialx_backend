"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const send_res_1 = require("./send.res");
const user_models_1 = require("../api/User/domain/user.models");
async function checkAuth(req, res, next) {
    try {
        const token = req.headers['access-token'];
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_KEY_APP);
        const { status, role } = await user_models_1.UserModel.findOne({ _id: decoded['user_id'] })
            .select(['_id', 'username', 'status', 'role'])
            .populate('role');
        if (status) {
            res['userData'] = { role, ...decoded };
            return next();
        }
    }
    catch (error) {
        return (0, send_res_1.badResponse)(res, 'server_mess_5', error.message, 401);
    }
}
exports.checkAuth = checkAuth;
//# sourceMappingURL=checkAuth.js.map