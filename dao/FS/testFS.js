import ProductsDaoFS from "./ProductsDaoFS.js";

const productsDao = new ProductsDaoFS("../../src/data/products.json");

async function test() {

    console.log("========== CREATE ==========");

    const created = await productsDao.create({
        title: "Mochila Slack",
        price: 200,
        category: "slackline"
    });

    console.log(created);

    console.log("========== GET ALL ==========");

    const allProducts = await productsDao.getAll();

    console.log(allProducts);

    console.log("========== GET BY ID ==========");

    const oneProduct = await productsDao.getById(created.id);

    console.log(oneProduct);

    console.log("========== UPDATE ==========");

    const updated = await productsDao.update(created.id, {
        price: 999
    });

    console.log(updated);

    console.log("========== DELETE ==========");

    const deleted = await productsDao.delete(created.id);

    console.log(deleted);

    console.log("========== FINAL ==========");

    console.log(await productsDao.getAll());
}

test();