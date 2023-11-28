import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2'

const userCollection = "usuarios";

const userSchema = new mongoose.Schema({
  nombre: String,
  apellido: String,
  email: {
    type: String,
    unique: true,
  },
  contrasena: String,
});

userSchema.plugin(mongoosePaginate);

export const userModel = mongoose.model(userCollection, userSchema);