"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = __importDefault(require("./data-source"));
const Pet_1 = require("../entities/Pet");
const Product_1 = require("../entities/Product");
const User_1 = require("../entities/User");
const Veterinary_1 = require("../entities/Veterinary");
const pet_factory_1 = __importDefault(require("./db/seeding/factories/pet.factory"));
const product_factory_1 = __importDefault(require("./db/seeding/factories/product.factory"));
const user_factory_1 = __importDefault(require("./db/seeding/factories/user.factory"));
const veterinary_factory_1 = __importDefault(require("./db/seeding/factories/veterinary.factory"));
data_source_1.default
    .initialize()
    .then(async () => {
    console.log("📌 Executing seeders...");
    await data_source_1.default.getRepository(Pet_1.Pet).count();
    await new pet_factory_1.default().run(data_source_1.default);
    console.log("✅ Seeding Pet completed.");
    await data_source_1.default.getRepository(Product_1.Product).count();
    await new product_factory_1.default().run(data_source_1.default);
    console.log("✅ Seeding Product completed.");
    await data_source_1.default.getRepository(User_1.User).count();
    await new user_factory_1.default().run(data_source_1.default);
    console.log("✅ Seeding User completed.");
    await data_source_1.default.getRepository(Veterinary_1.Veterinary).count();
    await new veterinary_factory_1.default().run(data_source_1.default);
    console.log("✅ Seeding Veterinary completed.");
    process.exit();
})
    .catch((error) => {
    console.error("❌ Error running seeder:", error);
    process.exit(1);
});
