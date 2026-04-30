import ProductsDaoFS from "./fs/ProductsDaoFS.js";
import ProductsDaoMongo from "./mongo/ProductsDaoMongo.js";

let productsDao;

if (process.env.PERSISTENCE === "MONGO") {
    productsDao = new ProductsDaoMongo();
} else {
    productsDao = new ProductsDaoFS("./products.json");
}

export default productsDao;