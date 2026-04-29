import express from 'express';
import { __dirname } from './utils.js';
import { Server } from 'socket.io';
import {engine} from "express-handlebars";
import routerProducts from './routes/product.routes.js';
//import cartRouter from "./routes/cart.routes.js";
import viewsRouter from './routes/views.routes.js';
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

const httpServer = app.listen(3000, () => {
    console.log("Server running on port 3000");
});

const socketServer = newServer (httpServer)