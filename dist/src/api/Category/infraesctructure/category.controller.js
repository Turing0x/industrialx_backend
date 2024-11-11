"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoinControllers = void 0;
const category_models_1 = require("../domain/category.models");
const send_res_1 = require("../../../helpers/send.res");
async function getAllCategories(req, res) {
    try {
        const coins = await category_models_1.CategoryModel.find();
        return (0, send_res_1.goodResponse)(res, 'crud_mess_0', coins);
    }
    catch (error) {
        return (0, send_res_1.badResponse)(res, 'mess_0', error.message);
    }
}
async function saveCategory(req, res) {
    try {
        const cat = req.body;
        const Coin = new category_models_1.CategoryModel(cat);
        await Coin.save();
        return (0, send_res_1.goodResponse)(res, 'cat_mess_1');
    }
    catch (error) {
        return (0, send_res_1.badResponse)(res, 'cat_mess_2');
    }
}
exports.CoinControllers = {
    getAllCategories,
    saveCategory
};
//# sourceMappingURL=category.controller.js.map