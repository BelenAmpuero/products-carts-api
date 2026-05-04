import { Router } from "express";
import productosDAO from "../dao/ProductsDao.js";
// import { title } from "process";

const router = Router();

router.get("/", (req, res)=>{
    res.render("index", {
        title: "Home",

    });
});

router.get("/products", async (req, res, next)=>{
    try{
        console.log("ENTRÓ A /products");

        const { query } = req.query; 

        const result = await productosDAO.getAll({ query })

        console.log(result); 

    res.render("products",{
        title: "Tienda",
        products: result.payload
    })}
    catch(error){
        next(error);
    }
});

export default router;