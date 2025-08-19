import { Request, Response } from "express";
import { Product } from "../entities/Product";
import {
  NotFoundError,
  handleHttpError,
  BadRequestError,
} from "../utils/error.handler";
import AppDataSource from "../config/data-source";
import { In } from "typeorm";

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
  const { name, description, image_url, price, stock, category } = req.body;
  try {
    if (!name || !price || !image_url || !stock || !category) {
      throw new BadRequestError("Missing fields");
    }

    const newProduct = new Product();
    newProduct.category = category;
    newProduct.name = name;
    newProduct.image_url = image_url;
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

    Object.assign(product, req.body);

    const saved = await Product.save(product);
    return res.status(200).json(saved);
  } catch (error) {
    handleHttpError(res, error);
  }
};

export const bulkDeleteProducts = async (req: Request, res: Response) => {
  try {
    const { idsToDelete } = req.body;
    const productRepository = AppDataSource.getRepository(Product);
    await productRepository.delete({ id: In(idsToDelete) });
    return res.status(200).send({
      message: "Products deleted successfully",
      deletedCount: idsToDelete.length,
    });
  } catch (error) {
    handleHttpError(res, error);
  }
};
