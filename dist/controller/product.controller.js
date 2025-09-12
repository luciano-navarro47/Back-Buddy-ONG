"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bulkDeleteProducts = exports.updateProduct = exports.getProductId = exports.createProduct = exports.getAllProducts = void 0;
const Product_1 = require("../entities/Product");
const error_handler_1 = require("../utils/error.handler");
const data_source_1 = __importDefault(require("../config/data-source"));
const typeorm_1 = require("typeorm");
const getAllProducts = async (req, res) => {
    try {
        const productsRepository = await data_source_1.default.getRepository(Product_1.Product);
        const products = await productsRepository.find();
        if (!products || products.length === 0) {
            throw new error_handler_1.NotFoundError("Products not found");
        }
        return res.status(200).send(products);
    }
    catch (error) {
        (0, error_handler_1.handleHttpError)(res, error);
    }
};
exports.getAllProducts = getAllProducts;
const createProduct = async (req, res) => {
    const { name, description, images, price, stock, category } = req.body;
    try {
        if (!name ||
            price == null ||
            !Array.isArray(images) ||
            images.length === 0 ||
            !stock ||
            !category) {
            throw new error_handler_1.BadRequestError("Missing or invalid fields");
        }
        const newProduct = new Product_1.Product();
        newProduct.category = category;
        newProduct.name = name;
        newProduct.images = images;
        newProduct.description = description;
        newProduct.price = price;
        newProduct.stock = stock;
        await newProduct.save();
        return res.status(201).send(newProduct);
    }
    catch (error) {
        (0, error_handler_1.handleHttpError)(res, error);
    }
};
exports.createProduct = createProduct;
const getProductId = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product_1.Product.findOneBy({ id: id });
        if (!product) {
            throw new error_handler_1.NotFoundError("Products not found");
        }
        return res.status(200).send(product);
    }
    catch (error) {
        (0, error_handler_1.handleHttpError)(res, error);
    }
};
exports.getProductId = getProductId;
const updateProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product_1.Product.findOneBy({ id: id });
        if (!product) {
            throw new error_handler_1.NotFoundError("Products not found");
        }
        const { images } = req.body;
        if (images !== undefined && !Array.isArray(images)) {
            throw new error_handler_1.BadRequestError("Images must be an array of URLs");
        }
        Object.assign(product, req.body);
        const saved = await Product_1.Product.save(product);
        return res.status(200).json(saved);
    }
    catch (error) {
        (0, error_handler_1.handleHttpError)(res, error);
    }
};
exports.updateProduct = updateProduct;
const bulkDeleteProducts = async (req, res) => {
    try {
        const { idsToDelete } = req.body;
        const productRepository = data_source_1.default.getRepository(Product_1.Product);
        await productRepository.delete({ id: (0, typeorm_1.In)(idsToDelete) });
        return res.status(200).send({
            message: "Products deleted successfully",
            deletedCount: idsToDelete.length,
        });
    }
    catch (error) {
        (0, error_handler_1.handleHttpError)(res, error);
    }
};
exports.bulkDeleteProducts = bulkDeleteProducts;
