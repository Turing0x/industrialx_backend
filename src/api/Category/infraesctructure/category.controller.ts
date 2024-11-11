import { Response, Request } from 'express';

import { CategoryModel } from '../domain/category.models';
import { goodResponse, badResponse } from '../../../helpers/send.res';
import { Category } from '../models/category.model';

async function getAllCategories(req: Request, res: Response) {
  try {
    const coins = await CategoryModel.find();
    return goodResponse(res, 'crud_mess_0', coins)
  } catch (error) { return badResponse(res, 'mess_0', error.message) }
}

async function saveCategory(req: Request, res: Response) {
  
  try {
    
    const cat: Category = req.body;
    const Coin = new CategoryModel(cat);
    
    await Coin.save();
    
    return goodResponse(res, 'cat_mess_1');
    
  } catch (error) { return badResponse(res, 'cat_mess_2') }
  
}

export const CoinControllers = {
  getAllCategories,
  saveCategory
}