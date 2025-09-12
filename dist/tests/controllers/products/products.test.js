"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Product_1 = require("../../../entities/Product");
const typeorm_1 = require("typeorm");
const data_source_1 = __importDefault(require("../../../config/data-source"));
const product_controller_1 = require("../../../controller/product.controller");
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
                image_url: "https://fakeimage.com/image.jpg",
                price: 9999,
                stock: 9999,
                category: "Test category",
            },
        };
        const mockResponse = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        };
        const mockProduct = new Product_1.Product();
        Object.assign(mockProduct, { ...mockRequest.body });
        jest.spyOn(Product_1.Product.prototype, "save").mockResolvedValueOnce(mockProduct);
        await (0, product_controller_1.createProduct)(mockRequest, mockResponse);
        const newProduct = mockResponse.send.mock.calls[0][0];
        expect(mockResponse.status).toHaveBeenCalledWith(201);
        expect(newProduct).toBeInstanceOf(Product_1.Product);
        expect(newProduct).toEqual(mockRequest.body);
    });
    // Negative case is needed
});
describe("Bulk Delete Products", () => {
    it("should delete multiple products successfully", async () => {
        const mockRequest = {
            body: {
                idsToDelete: ["Test ID 1", "Test ID 2", "Test ID 3"],
            },
        };
        const mockResponse = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        };
        const productRepositoryMock = {
            delete: jest.fn().mockResolvedValue({ affected: 3 }),
        };
        jest
            .spyOn(data_source_1.default, "getRepository")
            .mockReturnValue(productRepositoryMock);
        await (0, product_controller_1.bulkDeleteProducts)(mockRequest, mockResponse);
        expect(productRepositoryMock.delete).toHaveBeenCalledWith({
            id: (0, typeorm_1.In)(["Test ID 1", "Test ID 2", "Test ID 3"])
        });
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.send).toHaveBeenCalledWith({
            message: "Products deleted successfully",
            deletedCount: 3,
        });
    });
});
