import { Category } from "../entities/Product";

export interface IProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  image_url: string;
  category: Category;
  createdAt: Date;
  updatedAt: Date;
}