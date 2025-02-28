"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.getProductId = exports.createProduct = exports.getAllProducts = void 0;
const Product_1 = require("../Model/Product");
const error_handler_1 = require("../utils/error.handler");
const data_source_1 = __importDefault(require("../config/data-source"));
const getAllProducts = async (req, res) => {
    try {
        const productsRepository = await data_source_1.default.getRepository(Product_1.Product);
        const products = await productsRepository.find();
        if (!products || products.length === 0) {
            return (0, error_handler_1.handleHttpError)(res, "Products not found", 404);
        }
        return res.status(200).send(products);
    }
    catch (error) {
        console.log("ERRORRRRR: ", error);
        return (0, error_handler_1.handleHttpError)(res, "ERROR_GET_PRODUCTS", 500);
    }
};
exports.getAllProducts = getAllProducts;
const createProduct = async (req, res) => {
    const { name, description, image, price, stock, category } = req.body;
    try {
        if (!name || !price || !image || !stock || !category) {
            return (0, error_handler_1.handleHttpError)(res, "Name, price, image, category and stock are required", 400);
        }
        const newProduct = new Product_1.Product();
        newProduct.category = category;
        newProduct.name = name;
        newProduct.image = image;
        newProduct.description = description;
        newProduct.price = price;
        newProduct.stock = stock;
        await newProduct.save();
        return res.status(201).send(newProduct);
    }
    catch (error) {
        return (0, error_handler_1.handleHttpError)(res, "ERROR_CREATE_PRODUCT", 500);
    }
};
exports.createProduct = createProduct;
const getProductId = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product_1.Product.findOneBy({ id: id });
        if (!product) {
            return (0, error_handler_1.handleHttpError)(res, "Product not found", 404);
        }
        return res.status(200).send(product);
    }
    catch (error) {
        return (0, error_handler_1.handleHttpError)(res, "ERROR_GETTING_PRODUCT", 500);
    }
};
exports.getProductId = getProductId;
const updateProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product_1.Product.findOneBy({ id: id });
        if (!product) {
            return (0, error_handler_1.handleHttpError)(res, "Product not found", 404);
        }
        await Product_1.Product.update({ id: id }, req.body);
        return res.sendStatus(204);
    }
    catch (error) {
        return (0, error_handler_1.handleHttpError)(res, "ERROR_UPDATE_PRODUCT", 500);
    }
};
exports.updateProduct = updateProduct;
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const productRepository = data_source_1.default.getRepository(Product_1.Product);
        const product = await productRepository.findOne({ where: { id } });
        if (!product) {
            return (0, error_handler_1.handleHttpError)(res, "Product not found", 404);
        }
        await productRepository.remove(product);
        return res.status(200).send({ message: "Product deleted successfully" });
    }
    catch (error) {
        return (0, error_handler_1.handleHttpError)(res, "ERROR_DELETE_PRODUCT");
    }
};
exports.deleteProduct = deleteProduct;
