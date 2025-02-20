import dataSource from "./data-source";
import { Pet } from "../Model/Pet";
import { Product } from "../Model/Product";
import { User } from "../Model/User";
import { Veterinary } from "../Model/Veterinary";
import PetSeeder from "./db/seeding/factories/pet.factory";
import ProductSeeder from "./db/seeding/factories/product.factory";
import UserSeeder from "./db/seeding/factories/user.factory";
import VeterinarySeeder from "./db/seeding/factories/veterinary.factory";

dataSource
  .initialize()
  .then(async () => {
    console.log("📌 Executing seeders...");

    const petCount = await dataSource.getRepository(Pet).count();
    if (petCount > 0) {
      console.log("🐾 Pet table already has records. Seeding canceled.");
    } else {
      await new PetSeeder().run(dataSource);
      console.log("✅ Seeding Pet completed.");
    }

    const productCount = await dataSource.getRepository(Product).count();
    if (productCount > 0) {
      console.log("🐾 Product table already has records. Seeding canceled.");
    } else {
      await new ProductSeeder().run(dataSource);
      console.log("✅ Seeding User completed.");
    }

    const userCount = await dataSource.getRepository(User).count();
    if (userCount > 4) {
      console.log("🐾 User table already has records. Seeding canceled.");
    } else {
      await new UserSeeder().run(dataSource);
      console.log("✅ Seeding Product completed.");
    }

    const veterinaryCount = await dataSource.getRepository(Veterinary).count();
    if (veterinaryCount > 0) {
      console.log("🐾 Veterinary table already has records. Seeding canceled.");
    } else {
      await new VeterinarySeeder().run(dataSource);
      console.log("✅ Seeding Veterinary completed.");
    }

    process.exit();
  })
  .catch((error) => {
    console.error("❌ Error running seeder:", error);
    process.exit(1);
  });
