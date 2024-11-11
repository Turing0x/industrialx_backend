import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
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

export const ProductModel = mongoose.model("products", ProductSchema);
