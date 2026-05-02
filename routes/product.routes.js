import { Router, json, urlencoded } from "express";
import { attachManagerToRequest } from "../middlewares.js/products.middlewares.js";
import { productModel } from "../models/productModel.js";
import productsDao from "../dao/Index.js";

const router =  Router();

// router.use(attachManagerToRequest);
router.get('/', async (req, res, next) => {
    try {
        const products = await productsDao.getAll();
    res.status(200).send(products);
    } catch (error) {
        next (error)
    }
});

router.get("/:pid", async (req, res, next) => {
    try {
        const { pid } = req.params;

        const product = await productsDao.getById(pid);

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

        const result = await productsDao.delete(pid);

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
        const result = await productsDao.create(req.body);
        res.status(200).send(result);
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

        const updatedProduct = await productsDao.update(pid, updateData);

        if (!updatedProduct) {
            return res.status(404).send({ error: "Producto no encontrado" });
        }

        res.status(200).send(updatedProduct);
    } catch (error) {
        next(error);
    }
});


export default router;