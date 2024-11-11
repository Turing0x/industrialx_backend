import { Router } from 'express';

import { CoinControllers } from './infraesctructure/category.controller';

const router = Router()

router

  .get('/', CoinControllers.getAllCategories)
  .post('/', CoinControllers.saveCategory)

export const CategoryRouter = router
