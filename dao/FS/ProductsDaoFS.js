import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pathFile = path.join(__dirname, "../../data/products.json");
const dir = path.dirname(pathFile);

class ProductsDaoFS {
  async getAll() {
    console.log("Leyendo productos...");

    try {
      const data = await fs.readFile(pathFile, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      // si no existe el archivo, lo crea vacío
      await fs.mkdir(dir, { recursive: true });
      await fs.writeFile(pathFile, JSON.stringify([], null, 2));
      return [];
    }
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

    await fs.writeFile(pathFile, JSON.stringify(products, null, 2));

    return newProduct;
  }

  async update(id, updatedData) {
    const products = await this.getAll();
    const index = products.findIndex(p => p.id === id);

    if (index === -1) return null;

    products[index] = { ...products[index], ...updatedData };

    await fs.writeFile(pathFile, JSON.stringify(products, null, 2));

    return products[index];
  }

  async delete(id) {
    const products = await this.getAll();

    const filtered = products.filter(p => p.id !== id);

    if (products.length === filtered.length) return null;

    await fs.writeFile(pathFile, JSON.stringify(filtered, null, 2));

    return true;
  }
}

export default ProductsDaoFS;