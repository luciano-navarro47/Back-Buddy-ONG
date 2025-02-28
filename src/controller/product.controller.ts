import { Request, Response } from "express";
import { Product } from "../Model/Product";
import {
  NotFoundError,
  handleHttpError,
  BadRequestError,
} from "../utils/error.handler";
import AppDataSource from "../config/data-source";

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const productsRepository = await AppDataSource.getRepository(Product);
    const products = await productsRepository.find();
    // console.log("PRODUCTSSSSSS: ", products);
    if (!products || products.length === 0) {
      return handleHttpError(res, "Products not found", 404);
    }
    return res.status(200).send(products);
  } catch (error) {
    console.log("ERRORRRRR: ", error);
    return handleHttpError(res, "ERROR_GET_PRODUCTS", 500);
  }
};

export const createProduct = async (req: Request, res: Response) => {
  const { name, description, image, price, stock, category } = req.body;
  try {
    if (!name || !price || !image || !stock || !category) {
      return handleHttpError(
        res,
        "Name, price, image, category and stock are required",
        400
      );
    }

    const newProduct = new Product();
    newProduct.category = category;
    newProduct.name = name;
    newProduct.image = image;
    newProduct.description = description;
    newProduct.price = price;
    newProduct.stock = stock;

    await newProduct.save();
    return res.status(201).send(newProduct);
  } catch (error) {
    return handleHttpError(res, "ERROR_CREATE_PRODUCT", 500);
  }
};

export const getProductId = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const product = await Product.findOneBy({ id: id });

    if (!product) {
      return handleHttpError(res, "Product not found", 404);
    }
    return res.status(200).send(product);
  } catch (error) {
    return handleHttpError(res, "ERROR_GETTING_PRODUCT", 500);
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const product = await Product.findOneBy({ id: id });
    if (!product) {
      return handleHttpError(res, "Product not found", 404);
    }
    await Product.update({ id: id }, req.body);
    return res.sendStatus(204);
  } catch (error) {
    return handleHttpError(res, "ERROR_UPDATE_PRODUCT", 500);
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const productRepository = AppDataSource.getRepository(Product);
    const product = await productRepository.findOne({ where: { id } });

    if (!product) {
      return handleHttpError(res, "Product not found", 404);
    }

    await productRepository.remove(product);
    return res.status(200).send({ message: "Product deleted successfully" });
  } catch (error) {
    return handleHttpError(res, "ERROR_DELETE_PRODUCT");
  }
};
