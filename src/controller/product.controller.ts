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

    if (!products || products.length === 0) {
      throw new NotFoundError("Products not found");
    }
    return res.status(200).send(products);
  } catch (error) {
    handleHttpError(res, error);
  }
};

export const createProduct = async (req: Request, res: Response) => {
  const { name, description, image, price, stock, category } = req.body;
  try {
    if (!name || !price || !image || !stock || !category) {
      throw new BadRequestError("Missing fields");
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
    handleHttpError(res, error);
  }
};

export const getProductId = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const product = await Product.findOneBy({ id: id });

    if (!product) {
      throw new NotFoundError("Products not found");
    }
    return res.status(200).send(product);
  } catch (error) {
    handleHttpError(res, error);
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const product = await Product.findOneBy({ id: id });
    
    if (!product) {
      throw new NotFoundError("Products not found");
    }
    await Product.update({ id: id }, req.body);
    return res.sendStatus(200);
  } catch (error) {
    handleHttpError(res, error);
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const productRepository = AppDataSource.getRepository(Product);
    const product = await productRepository.findOne({ where: { id } });

    if (!product) {
      throw new NotFoundError("Products not found");
    }

    await productRepository.remove(product);
    return res.status(200).send({ message: "Product deleted successfully" });
  } catch (error) {
    handleHttpError(res, error);
  }
};
