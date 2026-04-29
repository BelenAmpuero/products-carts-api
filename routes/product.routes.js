import { Router, json, urlencoded } from "express";
import productosDAO from "../dao/ProductsDao.js";
import { attachManagerToRequest } from "../middlewares.js/products.middlewares.js";

const router =  Router();

router.use(attachManagerToRequest);

router.get('/', async (req, res) => {
    try {
    const productos = await req.productos.getAll();
    res.status(200).send(productos);
    } catch (error) {
        next (error)
    }
});

router.delete('/:id', async (req, res) => {
    try {
    const productos = await req.productos.deletProductosById(req.params);
    res.status(200).send(productos);
    } catch (error) {
        next (error)
}
});


router.use(json(),urlencoded({ extended: true}));



router.post('/:id', async (req, res) => {
    try {
    const productos = await req.ProductsManager.createProduct(req.body)
    res.status(200).send(product);
    } catch (error) {
        next (error)
    }
});

router.put('/:id', async (req, res) => {
    try{
        const product = await req.productos.updateProductoById(req.body)
        res.status(200).send(product);
    } catch (error) {
        next (error)
    }
});




export default router;