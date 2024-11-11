import express from 'express';
export const api = express.Router();

import COLLECTIONS from '../helpers/collections';

import { ProductRouter } from '../api/Product/product.router';
import { CategoryRouter } from '../api/Category/category.router';
import { UserRouter } from '../api/User/user.router';

api.use(`/${COLLECTIONS.PRODUCTS}`, ProductRouter)
api.use(`/${COLLECTIONS.CATEGORY}`, CategoryRouter)
api.use(`/${COLLECTIONS.USER}`, UserRouter)
