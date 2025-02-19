import dataSource from "./data-source";
import PetSeeder from "./db/seeding/factories/pet.factory";
import { Pet } from "../Model/Pet";

dataSource.initialize()
  .then(async () => {
    console.log("📌 Executing seeders...");
    
    const petCount = await dataSource.getRepository(Pet).count();
    if (petCount > 0) {
      console.log("🐾 Pet table already has records. Seeding canceled.");
    } else {
      await new PetSeeder().run(dataSource);
      console.log("✅ Seeding completed.");
    }

    process.exit();
  })
  .catch((error) => {
    console.error("❌ Error running seeder:", error);
    process.exit(1);
  });
