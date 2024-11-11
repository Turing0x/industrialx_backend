import { Router } from 'express';

import { ProductControllers } from './infraesctructure/product.controller';

const router = Router()

router

  .get('/', ProductControllers.getAllProducts)
  .get('/:id', ProductControllers.getProductById)

  .post('/', ProductControllers.saveProduct)

  .put('/:id', ProductControllers.editProduct)

  .delete('/:id', ProductControllers.deleteProductById)

export const ProductRouter = router
