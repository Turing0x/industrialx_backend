"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductControllers = void 0;
const product_models_1 = require("../domain/product.models");
const send_res_1 = require("../../../helpers/send.res");
async function getAllProducts(req, res) {
    try {
        const products = await product_models_1.ProductModel.find({ status: true }).populate("category");
        if (!products)
            return (0, send_res_1.badResponse)(res, "product_mess_9");
        return (0, send_res_1.goodResponse)(res, "crud_mess_0", products);
    }
    catch (error) {
        return (0, send_res_1.badResponse)(res, "mess_0", error.message);
    }
}
async function getProductById(req, res) {
    try {
        if (!req.params.id)
            return (0, send_res_1.badResponse)(res, "product_mess_8");
        const product = await product_models_1.ProductModel.findById(req.params.id).populate("category");
        return (0, send_res_1.goodResponse)(res, "crud_mess_0", product);
    }
    catch (error) {
        return (0, send_res_1.badResponse)(res, "mess_0", error.message);
    }
}
async function saveProduct(req, res) {
    try {
        const { name, description, category, photo, price, owner } = req.body;
        console.log(req.body);
        const product = await product_models_1.ProductModel.create({
            photo,
            price,
            name: name.toLowerCase(),
            description: description.toLowerCase(),
            category,
            owner,
        });
        return (0, send_res_1.goodResponse)(res, "crud_mess_0", product);
    }
    catch (error) {
        return (0, send_res_1.badResponse)(res, "product_mess_2", error.message);
    }
}
async function editProduct(req, res) {
    let { name, description, user, ...prod } = req.body;
    try {
        if (name)
            name = name.toLowerCase();
        if (description)
            description.toLowerCase();
        const product = await product_models_1.ProductModel.findByIdAndUpdate(req.params.id, {
            name,
            description,
            ...prod,
        }, { new: true });
        return (0, send_res_1.goodResponse)(res, "crud_mess_0", product);
    }
    catch (error) {
        return (0, send_res_1.badResponse)(res, "product_mess_4", error.message);
    }
}
async function deleteProductById(req, res) {
    try {
        const productDelete = await product_models_1.ProductModel.findByIdAndUpdate(req.params.id, { status: false }, { new: true });
        return (0, send_res_1.goodResponse)(res, "crud_mess_0", productDelete);
    }
    catch (error) {
        return (0, send_res_1.badResponse)(res, "product_mess_6", error.message);
    }
}
exports.ProductControllers = {
    deleteProductById,
    getAllProducts,
    getProductById,
    saveProduct,
    editProduct,
};
//# sourceMappingURL=product.controller.js.map