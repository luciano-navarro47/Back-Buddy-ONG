import dataSource from "./data-source";
import PetSeeder from "./db/seeding/factories/pet.factory";
import { Pet } from "../Model/Pet";
import { Product } from "../Model/Product";
import ProductSeeder from "./db/seeding/factories/product.factory";

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
      console.log("Product table already has records. Seeding canceled.");
    } else {
      await new ProductSeeder().run(dataSource);
      console.log("✅ Seeding Product completed.");
    }

    process.exit();
  })
  .catch((error) => {
    console.error("❌ Error running seeder:", error);
    process.exit(1);
  });
