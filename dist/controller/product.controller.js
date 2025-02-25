"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProduct = exports.getProductId = exports.createProduct = exports.getAllProducts = void 0;
const Product_1 = require("../Model/Product");
const error_handler_1 = require("../utils/error.handler");
const getAllProducts = async (req, res) => {
    try {
        const products = await Product_1.Product.find();
        res.status(200).send(products);
    }
    catch (error) {
        (0, error_handler_1.handleHttp)(res, 'ERROR_GET_PRODUCTS');
    }
};
exports.getAllProducts = getAllProducts;
const createProduct = async (req, res) => {
    const { name, description, image, price, stock, category } = req.body;
    try {
        const newProduct = new Product_1.Product();
        newProduct.category = category;
        newProduct.name = name;
        newProduct.image = image;
        newProduct.description = description;
        newProduct.price = price;
        newProduct.stock = stock;
        await newProduct.save();
        return res.status(200).send(newProduct);
    }
    catch (error) {
        (0, error_handler_1.handleHttp)(res, 'ERROR_CREATE_PRODUCT');
    }
};
exports.createProduct = createProduct;
const getProductId = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product_1.Product.find({
            where: [{ id: id }],
        });
        if (!product)
            throw new error_handler_1.NotFoundError(`Product not found by that ID: ${id}`);
        else
            res.status(200).send(product);
    }
    catch (error) {
        (0, error_handler_1.handleHttp)(res, 'ERROR_GETTING_PRODUCT');
    }
};
exports.getProductId = getProductId;
const updateProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product_1.Product.findOneBy({ id: id });
        if (!product)
            throw new error_handler_1.NotFoundError(`Product not found by that ID: ${id}`);
        await Product_1.Product.update({ id: id }, req.body);
        return res.sendStatus(204);
    }
    catch (error) {
        if (error instanceof Error) {
            (0, error_handler_1.handleHttp)(res, 'ERROR_UPDATE_PRODUCT');
        }
    }
};
exports.updateProduct = updateProduct;
