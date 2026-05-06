import { Router, json, urlencoded } from "express";
import { attachManagerToRequest } from "../middlewares.js/products.middlewares.js";
import { productModel } from "../models/productModel.js";

const router =  Router();

router.get('/', async (req, res, next) => {
    try {
        const {page = 1, limit = 10, category} = req.query;

        const filter = {};
        if (category) filter.category = category;

        const pageNum = parseInt(page) || 1;
        const limitNum = parseInt(limit) || 10;

        const skip = (pageNum - 1) * limitNum;

        const products = await productModel.find(filter)
        .skip(skip)
        .limit(limitNum)
        .lean();


    res.render("products", {
            title: "Productos",
            products,
            category
        });

    } catch (error) {
        next (error)

    }

});

router.get("/:pid", async (req, res, next) => {
    try {
        const { pid } = req.params;

        const product = await productModel.findById(pid).lean();

        if (!product) {
            return res.status(404).send({ error: "Producto no encontrado" });
        }

        res.send(product);
    } catch (error) {
        next(error);
    }
});

router.delete("/:pid", async (req, res, next) => {
    try {
        const { pid } = req.params;

        const result = await productModel.findByIdAndDelete(pid);

        if (!result) {
            return res.status(404).send({ error: "Producto no encontrado" });
        }

        res.send({ message: "Producto eliminado" });
    } catch (error) {
        next(error);
    }
});


router.use(json(),urlencoded({ extended: true}));




router.post('/', async (req, res, next) => {
    try {
         const result = Array.isArray(req.body)
            ? await productModel.insertMany(req.body)
            : await productModel.create(req.body);
        res.status(201).send(result);
    } catch (error) {
        next(error);
    }
});


router.put("/:pid", async (req, res, next) => {
    try {
        const { pid } = req.params;
        const updateData = req.body;

        // evitar que modifiquen el id
        delete updateData.id;
        delete updateData._id;

        const updatedProduct = await productModel.findByIdAndUpdate(
            pid,
            updateData,
            { new: true }
        );

        if (!updatedProduct) {
            return res.status(404).send({ error: "Producto no encontrado" });
        }

        res.status(200).send(updatedProduct);
    } catch (error) {
        next(error);
    }
});


export default router;