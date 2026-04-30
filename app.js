import dotenv from "dotenv";

dotenv.config();
import express from 'express';
import { __dirname } from './utils.js';
import {engine} from "express-handlebars";
import routerProducts from './routes/product.routes.js';
//import cartRouter from "./routes/cart.routes.js";
import viewsRouter from './routes/views.routes.js';
import mongoose from 'mongoose';



const app = express();

app.use(express.static(__dirname + "/public"));
app.engine("handlebars", engine())
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");

app.use("/api/products", routerProducts)
//app.use("/api/carts", cartRouter);
app.use("/", viewsRouter);

app.use((err, req, res, next) => {
    res.status(500).json({ error: err.message});
});

const httpServer = app.listen(8080, () => {
    console.log("Server running on port 8080");
    mongoose
    .connect("mongodb+srv://bnampuero_db_user:UP1wj23339DeTpFY@cluster0.mz6lked.mongodb.net/?appName=Cluster0")
    .then(console.log("conectado a base de datos"));
});

