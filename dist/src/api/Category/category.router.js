"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryRouter = void 0;
const express_1 = require("express");
const category_controller_1 = require("./infraesctructure/category.controller");
const router = (0, express_1.Router)();
router
    .get('/', category_controller_1.CoinControllers.getAllCategories)
    .post('/', category_controller_1.CoinControllers.saveCategory);
exports.CategoryRouter = router;
//# sourceMappingURL=category.router.js.map