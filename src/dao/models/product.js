import mongoose from "mongoose";

const productCollection = "productos";

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true
    },
    thumbnail: String,
    code: {
        type: String,
        required: true,
        unique: true
    },
    stock : {
        type: Number,
        required: true
    }
});

export const productModel = mongoose.model(productCollection, productSchema);