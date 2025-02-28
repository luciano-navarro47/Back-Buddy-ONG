import { Repository } from "typeorm";
import { Product } from "../../../Model/Product";
import AppDataSource from "../../../config/data-source";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
} from "../../../controller/product.controller";
import { Request, Response } from "express";

// describe("Get All Products", () => {
//   it("should return all available products", async () => {

//     const mockProducts = [1, 2].map(id => {
//       const product = new Product();
//       Object.assign(product, { id, name: "Test Product" });
//       return product;
//     });

//     const mockRequest = {} as Request;
//     const mockResponse = {
//       status: jest.fn().mockReturnThis(),
//       send: jest.fn(),
//     } as unknown as Response;
    
//     jest.spyOn(Product, "find").mockResolvedValue(mockProducts);

//     await getAllProducts(mockRequest, mockResponse);

//     const allProducts = (mockResponse.send as jest.Mock).mock.calls[0][0];
//     // console.log("PRODUCCCCCCCCCSTS ",allProducts)
//     expect(mockResponse.status).toHaveBeenCalledWith(200);
//     expect(allProducts.length).toBeGreaterThan(0);
//   });

//   it("should return 'Products not found' message", async () => {
//     const mockRequest = {} as Request;
//     const mockResponse = {
//       status: jest.fn().mockReturnThis(),
//       send: jest.fn(),
//     } as unknown as Response;

//     // We simulate that mocked repository returns an empty array
//     const mockRepository = { 
//       find: jest.fn().mockResolvedValue([])
//     } as unknown as Repository<Product>


//     jest.spyOn(AppDataSource, "getRepository").mockReturnValue(mockRepository);

//     await getAllProducts(mockRequest, mockResponse);

//     expect(mockResponse.status).toHaveBeenCalledWith(404);
//     expect(mockResponse.send).toHaveBeenCalledWith({
//       error: "Products not found",
//     });
//   });
// });

describe("Create Product", () => {
  it("should return a new product", async () => {
    const mockRequest = {
      body: {
        name: "Test Name",
        description: "Test Description",
        image: "https://fakeimage.com/image.jpg",
        price: 9999,
        stock: 9999,
        category: "Test category",
      },
    } as unknown as Request;

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as unknown as Response;

    const mockProduct = new Product();
    Object.assign(mockProduct, { ...mockRequest.body });

    jest.spyOn(Product.prototype, "save").mockResolvedValueOnce(mockProduct);

    await createProduct(mockRequest, mockResponse);

    const newProduct = (mockResponse.send as jest.Mock).mock.calls[0][0];

    expect(mockResponse.status).toHaveBeenCalledWith(201);
    expect(newProduct).toBeInstanceOf(Product);
    expect(newProduct).toEqual(mockRequest.body);
  });

  // Negative case is needed
});

describe("Delete Product", () => {
  it("should delete a product successfully", async () => {
    const mockRequest = {
      params: {
        id: "Test ID",
      },
    } as unknown as Request;

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as unknown as Response;

    const mockProduct = new Product();
    Object.assign(mockProduct, { id: "Test ID" });

    const productRepositoryMock = {
      findOne: jest.fn().mockReturnValue(mockProduct),
      remove: jest.fn().mockReturnValue(mockProduct),
    };

    jest
      .spyOn(AppDataSource, "getRepository")
      .mockReturnValue(productRepositoryMock as any);

    await deleteProduct(mockRequest, mockResponse);

    expect(productRepositoryMock.findOne).toHaveBeenCalledWith({
      where: { id: "Test ID" },
    });
    expect(productRepositoryMock.remove).toHaveBeenCalledWith(mockProduct);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.send).toHaveBeenCalledWith({ message: "Product deleted successfully"})
  });
});