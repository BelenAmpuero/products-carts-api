import { Router } from "express";
import productosDAO from "../dao/ProductsDao.js";
// import { title } from "process";

const router = Router();

router.get("/", (req, res)=>{
    res.render("index.handlebars", {
        title: "Home",

    });
});

router.get("/products", async (req, res)=>{
    const products = await productosDAO.getAll()
    res.render("products.handlebars",{
        title: "Tienda",
        products
    });
});

export default router;