import dataSource from "./data-source";
import { Pet } from "../entities/Pet";
import { Product } from "../entities/Product";
import { User } from "../entities/User";
import { Veterinary } from "../entities/Veterinary";
import PetSeeder from "./db/seeding/factories/pet.factory";
import ProductSeeder from "./db/seeding/factories/product.factory";
import UserSeeder from "./db/seeding/factories/user.factory";
import VeterinarySeeder from "./db/seeding/factories/veterinary.factory";

dataSource
  .initialize()
  .then(async () => {
    console.log("📌 Executing seeders...");

    await dataSource.getRepository(Pet).count();
    await new PetSeeder().run(dataSource);
    console.log("✅ Seeding Pet completed.");

    await dataSource.getRepository(Product).count();
    await new ProductSeeder().run(dataSource);
    console.log("✅ Seeding Product completed.");

    await dataSource.getRepository(User).count();
    await new UserSeeder().run(dataSource);
    console.log("✅ Seeding User completed.");

    await dataSource.getRepository(Veterinary).count();
    await new VeterinarySeeder().run(dataSource);
    console.log("✅ Seeding Veterinary completed.");

    process.exit();
  })
  .catch((error) => {
    console.error("❌ Error running seeder:", error);
    process.exit(1);
  });
