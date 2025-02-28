"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Product_1 = require("../../../Model/Product");
const data_source_1 = __importDefault(require("../../../config/data-source"));
const product_controller_1 = require("../../../controller/product.controller");
describe("Get All Products", () => {
    it("should return all available products", async () => {
        const mockProducts = [1, 2].map(id => {
            const product = new Product_1.Product();
            Object.assign(product, { id, name: "Test Product" });
            return product;
        });
        const mockRequest = {};
        const mockResponse = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        };
        jest.spyOn(Product_1.Product, "find").mockResolvedValue(mockProducts);
        await (0, product_controller_1.getAllProducts)(mockRequest, mockResponse);
        const allProducts = mockResponse.send.mock.calls[0][0];
        // console.log("PRODUCCCCCCCCCSTS ",allProducts)
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(allProducts.length).toBeGreaterThan(0);
    });
    it("should return 'Products not found' message", async () => {
        const mockRequest = {};
        const mockResponse = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        };
        // We simulate that mocked repository returns an empty array
        const mockRepository = {
            find: jest.fn().mockResolvedValue([])
        };
        jest.spyOn(data_source_1.default, "getRepository").mockReturnValue(mockRepository);
        await (0, product_controller_1.getAllProducts)(mockRequest, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(404);
        expect(mockResponse.send).toHaveBeenCalledWith({
            error: "Products not found",
        });
    });
});
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
describe("Delete Product", () => {
    it("should delete a product successfully", async () => {
        const mockRequest = {
            params: {
                id: "Test ID",
            },
        };
        const mockResponse = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        };
        const mockProduct = new Product_1.Product();
        Object.assign(mockProduct, { id: "Test ID" });
        const productRepositoryMock = {
            findOne: jest.fn().mockReturnValue(mockProduct),
            remove: jest.fn().mockReturnValue(mockProduct),
        };
        jest
            .spyOn(data_source_1.default, "getRepository")
            .mockReturnValue(productRepositoryMock);
        await (0, product_controller_1.deleteProduct)(mockRequest, mockResponse);
        expect(productRepositoryMock.findOne).toHaveBeenCalledWith({
            where: { id: "Test ID" },
        });
        expect(productRepositoryMock.remove).toHaveBeenCalledWith(mockProduct);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.send).toHaveBeenCalledWith({ message: "Product deleted successfully" });
    });
});
