import { productModel } from "../models/productModel.js";

export const categoriesMiddleware = async (req, res, next) => {
    try {
        const categories = await productModel.distinct("category");
        res.locals.categories = categories;
        next();
    } catch (error) {
        next(error);
    }};