import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({

  status: {
    type: Boolean,
    require: false,
    default: true
  }, 
  name: {
    type: String,
    require: true
  },
  address: {
    type: String,
    require: true
  },
  username: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true
  },
  phone: {
    type: String,
    require: true
  },
  dom_description: {
    type: String,
    require: true
  },
  role: {
    type: String,
    default: 'seller',
    require: true
  }

});

export const UserModel = mongoose.model('users', UserSchema)