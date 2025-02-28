"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = __importDefault(require("./data-source"));
const Pet_1 = require("../Model/Pet");
const Product_1 = require("../Model/Product");
const User_1 = require("../Model/User");
const Veterinary_1 = require("../Model/Veterinary");
const pet_factory_1 = __importDefault(require("./db/seeding/factories/pet.factory"));
const product_factory_1 = __importDefault(require("./db/seeding/factories/product.factory"));
const user_factory_1 = __importDefault(require("./db/seeding/factories/user.factory"));
const veterinary_factory_1 = __importDefault(require("./db/seeding/factories/veterinary.factory"));
data_source_1.default
    .initialize()
    .then(async () => {
    console.log("📌 Executing seeders...");
    const petCount = await data_source_1.default.getRepository(Pet_1.Pet).count();
    if (petCount > 0) {
        console.log("🐾 Pet table already has records. Seeding canceled.");
    }
    else {
        await new pet_factory_1.default().run(data_source_1.default);
        console.log("✅ Seeding Pet completed.");
    }
    const productCount = await data_source_1.default.getRepository(Product_1.Product).count();
    if (productCount > 0) {
        console.log("🐾 Product table already has records. Seeding canceled.");
    }
    else {
        await new product_factory_1.default().run(data_source_1.default);
        console.log("✅ Seeding User completed.");
    }
    const userCount = await data_source_1.default.getRepository(User_1.User).count();
    if (userCount > 4) {
        console.log("🐾 User table already has records. Seeding canceled.");
    }
    else {
        await new user_factory_1.default().run(data_source_1.default);
        console.log("✅ Seeding Product completed.");
    }
    const veterinaryCount = await data_source_1.default.getRepository(Veterinary_1.Veterinary).count();
    if (veterinaryCount > 0) {
        console.log("🐾 Veterinary table already has records. Seeding canceled.");
    }
    else {
        await new veterinary_factory_1.default().run(data_source_1.default);
        console.log("✅ Seeding Veterinary completed.");
    }
    process.exit();
})
    .catch((error) => {
    console.error("❌ Error running seeder:", error);
    process.exit(1);
});
