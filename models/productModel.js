import { Schema, model } from "mongoose";

const productSchema = new Schema ({
    code: {
        type: String,
        required: true,
        unique: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    status: Boolean,
    price: {
        type: Number,
        required: true,
    },
    stock: Number,
    category: String,
    thumbnails: Array,
});

export const productModel = model("products", productSchema);