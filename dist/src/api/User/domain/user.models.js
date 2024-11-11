"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const UserSchema = new mongoose_1.default.Schema({
    status: {
        type: Boolean,
        require: false,
        default: true
    },
    name: {
        type: String,
        require: true
    },
    address: {
        type: String,
        require: true
    },
    username: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    phone: {
        type: String,
        require: true
    },
    dom_description: {
        type: String,
        require: true
    },
    role: {
        type: String,
        default: 'seller',
        require: true
    }
});
exports.UserModel = mongoose_1.default.model('users', UserSchema);
//# sourceMappingURL=user.models.js.map