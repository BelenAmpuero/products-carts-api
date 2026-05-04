import { Router } from "express";
import { cartModel } from "../models/cartModel.js";

const router = Router();

// Obtener carrito con populate
router.get("/:cid", async (req, res, next) => {
    try {
        const { cid } = req.params;

        const cart = await cartModel
            .findById(cid)
            .populate("products.product");

        if (!cart) {
            return res.status(404).send({ error: "Cart not found" });
        }

        res.send(cart);
    } catch (error) {
        next(error);
    }
});


// Agregar producto
router.post("/:cid/products/:pid", async (req, res, next) => {
    try {
        const { cid, pid } = req.params;

        const cart = await cartModel.findById(cid);
        if (!cart) return res.status(404).send({ error: "Cart not found" });

        const productDB = await productModel.findById(pid);
        if (!productDB) return res.status(404).send({ error: "Product not found" });

        const productInCart = cart.products.find(
            p => p.product.toString() === pid
        );

        //  VALIDACIÓN DE STOCK
        if (productInCart) {
            if (productInCart.quantity + 1 > productDB.stock) {
                return res.status(400).send({ error: "No hay suficiente stock" });
            }
            productInCart.quantity += 1;
        } else {
            if (productDB.stock < 1) {
                return res.status(400).send({ error: "Sin stock disponible" });
            }

            cart.products.push({
                product: pid,
                quantity: 1
            });
        }

        await cart.save();

        res.send(cart);
    } catch (error) {
        next(error);
    }
});

// Eliminar producto del carrito
router.delete("/:cid/products/:pid", async (req, res, next) => {
    try {
        const { cid, pid } = req.params;

        const cart = await cartModel.findById(cid);
        if (!cart) return res.status(404).send({ error: "Cart not found" });

        cart.products = cart.products.filter(
            p => p.product.toString() !== pid
        );

        await cart.save();

        res.send(cart);
    } catch (error) {
        next(error);
    }
});


// Reemplazar TODOS los productos del carrito
router.put("/:cid", async (req, res, next) => {
    try {
        const { cid } = req.params;

        const updatedCart = await cartModel.findByIdAndUpdate(
            cid,
            { products: req.body },
            { new: true }
        );

        res.send(updatedCart);
    } catch (error) {
        next(error);
    }
});


// Actualizar SOLO la cantidad
router.put("/:cid/products/:pid", async (req, res, next) => {
    try {
        const { cid, pid } = req.params;
        const { quantity } = req.body;

        const cart = await cartModel.findById(cid);
        if (!cart) return res.status(404).send({ error: "Cart not found" });

        const product = cart.products.find(
            p => p.product.toString() === pid
        );

        if (!product) {
            return res.status(404).send({ error: "Product not in cart" });
        }

        product.quantity = quantity;

        await cart.save();

        res.send(cart);
    } catch (error) {
        next(error);
    }
});


// Vaciar carrito
router.delete("/:cid", async (req, res, next) => {
    try {
        const { cid } = req.params;

        const cart = await cartModel.findById(cid);
        if (!cart) return res.status(404).send({ error: "Cart not found" });

        cart.products = [];

        await cart.save();

        res.send({ message: "Cart emptied" });
    } catch (error) {
        next(error);
    }
});

export default router;