import fs from "fs";

class ProductsDaoFS {
    constructor(path) {
        this.path = path;
    }

    async getAll() {
        const data = await fs.promises.readFile(this.path, "utf-8");
        return JSON.parse(data);
    }

    async getById(id) {
        const products = await this.getAll();
        return products.find(p => p.id === id);
    }

    
async create(product) {
    const products = await this.getAll();

    const newProduct = {
        id: Date.now().toString(),
        ...product
    };

    products.push(newProduct);

    await fs.promises.writeFile(
        this.path,
        JSON.stringify(products, null, 2)
    );

    return newProduct;
}
    async update(id, updatedData) {
        const products = await this.getAll();
        const index = products.findIndex(p => p.id === id);

        if (index === -1) return null;

        products[index] = { ...products[index], ...updatedData };

        await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));
        return products[index];
    }

    async delete(id) {
    const products = await this.getAll();

    const filtered = products.filter(p => p.id !== id);

    if (products.length === filtered.length) return null;

    await fs.promises.writeFile(this.path, JSON.stringify(filtered, null, 2));

    return true;
}
}

export default ProductsDaoFS;