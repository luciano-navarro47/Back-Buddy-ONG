"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pet_factory_1 = __importDefault(require("../../config/db/seeding/factories/pet.factory"));
const product_factory_1 = __importDefault(require("../../config/db/seeding/factories/product.factory"));
const user_factory_1 = __importDefault(require("../../config/db/seeding/factories/user.factory"));
const veterinary_factory_1 = __importDefault(require("../../config/db/seeding/factories/veterinary.factory"));
describe("PetSeeder", () => {
    let dataSourceMock;
    beforeEach(() => {
        const saveMock = jest.fn().mockResolvedValue(undefined);
        dataSourceMock = {
            createEntityManager: jest.fn(() => ({
                save: saveMock,
                find: jest.fn(),
            })),
        };
    });
    it("should create and save 10 pets with expected properties", async () => {
        const petSeeder = new pet_factory_1.default();
        await petSeeder.run(dataSourceMock);
        const entityManager = dataSourceMock.createEntityManager();
        const savedPets = entityManager.save.mock.calls[0][0];
        expect(savedPets).toHaveLength(10);
        savedPets.forEach((pet) => {
            expect(pet).toHaveProperty("size");
            expect(pet).toHaveProperty("specie");
            expect(pet).toHaveProperty("age");
            expect(pet).toHaveProperty("sex");
            expect(pet).toHaveProperty("status");
            expect(pet).toHaveProperty("detail");
            expect(pet).toHaveProperty("area");
            expect(pet).toHaveProperty("img");
        });
    });
});
describe("ProductSeeder", () => {
    let dataSourceMock;
    beforeEach(() => {
        const saveMock = jest.fn().mockResolvedValue(undefined);
        dataSourceMock = {
            createEntityManager: jest.fn(() => ({
                save: saveMock,
                find: jest.fn(),
            })),
        };
    });
    it("should create and save 10 products with expected properties", async () => {
        const productSeeder = new product_factory_1.default();
        await productSeeder.run(dataSourceMock);
        const entityManager = dataSourceMock.createEntityManager();
        const savedProducts = entityManager.save.mock.calls[0][0];
        expect(savedProducts).toHaveLength(10);
        savedProducts.forEach((product) => {
            expect(product).toHaveProperty("category");
            expect(product).toHaveProperty("image_url");
            expect(product).toHaveProperty("name");
            expect(product).toHaveProperty("description");
            expect(product).toHaveProperty("price");
            expect(product).toHaveProperty("stock");
        });
    });
});
describe("UserSeeder", () => {
    let dataSourceMock;
    beforeEach(() => {
        const saveMock = jest.fn().mockResolvedValue(undefined);
        dataSourceMock = {
            createEntityManager: jest.fn(() => ({
                save: saveMock,
                find: jest.fn(),
            })),
        };
    });
    it("should create and save 10 users with expected properties", async () => {
        const userSeeder = new user_factory_1.default();
        await userSeeder.run(dataSourceMock);
        const entityManager = dataSourceMock.createEntityManager();
        const savedUsers = entityManager.save.mock.calls[0][0];
        expect(savedUsers).toHaveLength(10);
        savedUsers.forEach((user) => {
            expect(user).toHaveProperty("first_name");
            expect(user).toHaveProperty("last_name");
            expect(user).toHaveProperty("email");
            expect(user).toHaveProperty("password");
            expect(user).toHaveProperty("username");
            expect(user).toHaveProperty("phone");
            expect(user).toHaveProperty("role");
            expect(user).toHaveProperty("status");
        });
    });
});
describe("VeterinarySeeder", () => {
    let dataSourceMock;
    beforeEach(() => {
        const saveMock = jest.fn().mockResolvedValue(undefined);
        dataSourceMock = {
            createEntityManager: jest.fn(() => ({
                save: saveMock,
                find: jest.fn(),
            })),
        };
    });
    it("should create and save 10 users with expected properties", async () => {
        const veterinarySeeder = new veterinary_factory_1.default();
        await veterinarySeeder.run(dataSourceMock);
        const entityManager = dataSourceMock.createEntityManager();
        const savedVeterinaries = entityManager.save.mock.calls[0][0];
        expect(savedVeterinaries).toHaveLength(10);
        savedVeterinaries.forEach((veterinary) => {
            expect(veterinary).toHaveProperty("image");
            expect(veterinary).toHaveProperty("name");
            expect(veterinary).toHaveProperty("description");
            expect(veterinary).toHaveProperty("phone");
            expect(veterinary).toHaveProperty("location");
            expect(veterinary).toHaveProperty("address");
            expect(veterinary).toHaveProperty("email");
        });
    });
});
