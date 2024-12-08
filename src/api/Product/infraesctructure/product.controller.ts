import { Response, Request } from "express";

import { ProductModel } from "../domain/product.models";
import { goodResponse, badResponse } from "../../../helpers/send.res";

async function getAllProducts(req: Request, res: Response) {
  try {
    const products = await ProductModel.find({ status: true }).populate(
      "category"
    );

    if (!products) return badResponse(res, "product_mess_9");

    return goodResponse(res, "crud_mess_0", products);
  } catch (error) {
    return badResponse(res, "mess_0", error.message);
  }
}

async function getProductById(req: Request, res: Response) {
  try {
    if (!req.params.id) return badResponse(res, "product_mess_8");
    const product = await ProductModel.findById(req.params.id).populate(
      "category"
    );

    return goodResponse(res, "crud_mess_0", product);
  } catch (error) {
    return badResponse(res, "mess_0", error.message);
  }
}

async function saveProduct(req: Request, res: Response) {
  try {
    const { name, description, category, photo, price, owner } = req.body;
    console.log(req.body);

    const product = await ProductModel.create({
      photo,
      price,
      name: name.toLowerCase(),
      description: description.toLowerCase(),
      category,
      owner,
    });

    return goodResponse(res, "crud_mess_0", product);
  } catch (error) {
    return badResponse(res, "product_mess_2", error.message);
  }
}

async function editProduct(req: Request, res: Response) {
  let { name, description, user, ...prod } = req.body;

  try {
    if (name) name = name.toLowerCase();
    if (description) description.toLowerCase();
    const product = await ProductModel.findByIdAndUpdate(
      req.params.id,
      {
        name,
        description,
        ...prod,
      },
      { new: true }
    );

    return goodResponse(res, "crud_mess_0", product);
  } catch (error) {
    return badResponse(res, "product_mess_4", error.message);
  }
}

async function deleteProductById(req: Request, res: Response) {
  try {
    const productDelete = await ProductModel.findByIdAndUpdate(
      req.params.id,
      { status: false },
      { new: true }
    );

    return goodResponse(res, "crud_mess_0", productDelete);
  } catch (error) {
    return badResponse(res, "product_mess_6", error.message);
  }
}

export const ProductControllers = {
  deleteProductById,
  getAllProducts,
  getProductById,
  saveProduct,
  editProduct,
};
