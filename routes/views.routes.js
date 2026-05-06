import { Router } from "express";
import { cartModel } from "../models/cartModel.js";
import { productModel } from "../models/productModel.js";
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

        const { category } = req.query; 

        const filter = {};
        if (category) {
            filter.category = category;
        }

        const products = await productModel.find(filter).lean();
        const categories = await productModel.distinct("category");

        console.log(products); 

    res.render("products",{
        title: "Tienda",
        products: products,
        categories
    });
}


    catch(error){
        next(error);
    }
});

router.get("/carts/:cid", async (req, res, next) => {
    try {

        const { cid } = req.params;

        const cart = await cartModel
            .findById(cid)
            .populate("products.product")
            .lean();

        if (!cart) {
            return res.status(404).send("Cart not found");
        }

        res.render("cart", {
            title: "Carrito",
            cart
        });

    } catch (error) {
        next(error);
    }
});

export default router;