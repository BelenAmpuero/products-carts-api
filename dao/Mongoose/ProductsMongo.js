import { productModel } from "../models/productModel.js";

class ProductsDaoMongo {
    async getAll({ limit = 10, page = 1, query, sort }) {
    // Filtro
    let filter = {};

    if (query) {
        // por categoría o status
        if (query === "true" || query === "false") {
            filter.status = query === "true";
        } else {
            filter.category = query;
        }
    }

    // Orden
    let sortOption = {};
    if (sort === "asc") sortOption.price = 1;
    if (sort === "desc") sortOption.price = -1;

    // Paginación
    const skip = (page - 1) * limit;

    const products = await productModel
        .find(filter)
        .sort(sortOption)
        .skip(skip)
        .limit(limit);

    const totalDocs = await productModel.countDocuments(filter);
    const totalPages = Math.ceil(totalDocs / limit);

    return {
        status: "success",
        payload: products,
        totalPages,
        prevPage: page > 1 ? page - 1 : null,
        nextPage: page < totalPages ? page + 1 : null,
        page,
        hasPrevPage: page > 1,
        hasNextPage: page < totalPages
    };
}

    async getById(id) {
        return await productModel.findById(id);
    }

    async create(product) {
        return await productModel.create(product);
    }

    async update(id, data) {
        return await productModel.findByIdAndUpdate(id, data, { new: true });
    }

    async delete(id) {
        return await productModel.findByIdAndDelete(id);
    }
}

export default ProductsDaoMongo;
