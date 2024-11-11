"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.api = void 0;
const express_1 = __importDefault(require("express"));
exports.api = express_1.default.Router();
const collections_1 = __importDefault(require("../helpers/collections"));
const product_router_1 = require("../api/Product/product.router");
const category_router_1 = require("../api/Category/category.router");
const user_router_1 = require("../api/User/user.router");
exports.api.use(`/${collections_1.default.PRODUCTS}`, product_router_1.ProductRouter);
exports.api.use(`/${collections_1.default.CATEGORY}`, category_router_1.CategoryRouter);
exports.api.use(`/${collections_1.default.USER}`, user_router_1.UserRouter);
//# sourceMappingURL=index.routes.js.map