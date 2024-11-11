import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema({

  name: {
    type: String,
    default: true
  }

});

export const CategoryModel = mongoose.model('category', CategorySchema)