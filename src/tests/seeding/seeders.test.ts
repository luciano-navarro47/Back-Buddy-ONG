import { DataSource } from "typeorm";

import { Pet } from "../../Model/Pet";
import { Product } from "../../Model/Product";
import { Veterinary } from "../../Model/Veterinary";
import { User } from "../../Model/User";
import PetSeeder from "../../config/db/seeding/factories/pet.factory";
import ProductSeeder from "../../config/db/seeding/factories/product.factory";
import UserSeeder from "../../config/db/seeding/factories/user.factory";
import VeterinarySeeder from "../../config/db/seeding/factories/veterinary.factory";

describe("PetSeeder", () => {
  let dataSourceMock: DataSource;

  beforeEach(() => {
    const saveMock = jest.fn().mockResolvedValue(undefined);
    dataSourceMock = {
      createEntityManager: jest.fn(() => ({
        save: saveMock,
        find: jest.fn(),
      })),
    } as unknown as DataSource;
  });

  it("should create and save 10 pets with expected properties", async () => {
    const petSeeder = new PetSeeder();
    await petSeeder.run(dataSourceMock);

    const entityManager = dataSourceMock.createEntityManager();

    const savedPets = (entityManager.save as jest.Mock).mock.calls[0][0];

    expect(savedPets).toHaveLength(10);

    savedPets.forEach((pet: Pet) => {
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
  let dataSourceMock: DataSource;

  beforeEach(() => {
    const saveMock = jest.fn().mockResolvedValue(undefined);
    dataSourceMock = {
      createEntityManager: jest.fn(() => ({
        save: saveMock,
        find: jest.fn(),
      })),
    } as unknown as DataSource;
  });

  it("should create and save 10 products with expected properties", async () => {
    const productSeeder = new ProductSeeder();
    await productSeeder.run(dataSourceMock);

    const entityManager = dataSourceMock.createEntityManager();

    const savedProducts = (entityManager.save as jest.Mock).mock.calls[0][0];

    expect(savedProducts).toHaveLength(10);

    savedProducts.forEach((product: Product) => {
      expect(product).toHaveProperty("category");
      expect(product).toHaveProperty("image");
      expect(product).toHaveProperty("name");
      expect(product).toHaveProperty("description");
      expect(product).toHaveProperty("price");
      expect(product).toHaveProperty("stock");
    });
  });
});

describe("UserSeeder", ()=>{
  let dataSourceMock: DataSource;

  beforeEach(() => {
    const saveMock = jest.fn().mockResolvedValue(undefined);
    dataSourceMock = {
      createEntityManager: jest.fn(() => ({
        save: saveMock,
        find: jest.fn(),
      })),
    } as unknown as DataSource;
  });

  it("should create and save 10 users with expected properties", async () => {
    const userSeeder = new UserSeeder();
    await userSeeder.run(dataSourceMock);

    const entityManager = dataSourceMock.createEntityManager();
    
    const savedUsers = (entityManager.save as jest.Mock).mock.calls[0][0];

    expect(savedUsers).toHaveLength(10);

    savedUsers.forEach((user: User) => {
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
})

describe("VeterinarySeeder", ()=>{
  let dataSourceMock: DataSource;

  beforeEach(() => {
    const saveMock = jest.fn().mockResolvedValue(undefined);
    dataSourceMock = {
      createEntityManager: jest.fn(() => ({
        save: saveMock,
        find: jest.fn(),
      })),
    } as unknown as DataSource;
  });

  it("should create and save 10 users with expected properties", async () => {
    const veterinarySeeder = new VeterinarySeeder();
    await veterinarySeeder.run(dataSourceMock);

    const entityManager = dataSourceMock.createEntityManager();
    
    const savedVeterinaries = (entityManager.save as jest.Mock).mock.calls[0][0];

    expect(savedVeterinaries).toHaveLength(10);

    savedVeterinaries.forEach((veterinary: Veterinary) => {
      expect(veterinary).toHaveProperty("image");
      expect(veterinary).toHaveProperty("name");
      expect(veterinary).toHaveProperty("description");
      expect(veterinary).toHaveProperty("phone");
      expect(veterinary).toHaveProperty("location");
      expect(veterinary).toHaveProperty("address");
      expect(veterinary).toHaveProperty("email");
    });
  });
})