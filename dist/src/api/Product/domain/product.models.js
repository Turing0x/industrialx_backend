"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const ProductSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        require: true,
    },
    slug: {
        type: String,
        require: true,
    },
    description: {
        type: String,
        require: true,
    },
    category: {
        type: String,
        require: true,
    },
    photo: {
        type: String,
        require: true,
    },
    price: {
        type: Number,
        require: true,
    },
});
exports.ProductModel = mongoose_1.default.model("products", ProductSchema);
//# sourceMappingURL=product.models.js.map