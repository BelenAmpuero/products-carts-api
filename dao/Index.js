import dotenv from "dotenv";
dotenv.config();
import ProductsDaoFS from "./fs/ProductsDaoFS.js";
import ProductsDaoMongo from "./mongo/ProductsMongo.js";

let productsDao;

if (process.env.PERSISTENCE === "MONGO") {
    productsDao = new ProductsDaoMongo();
} else {
    productsDao = new ProductsDaoFS("./products.json");
}

console.log("PERSISTENCE:", process.env.PERSISTENCE);

export default productsDao;