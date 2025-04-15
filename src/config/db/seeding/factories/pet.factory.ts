import { Seeder } from "@jorgebodega/typeorm-seeding";
import { DataSource } from "typeorm/data-source";

import { Pet } from "../../../../entities/Pet";
import { getPetRandomData } from "../../../../utils/getRandomData";

export default class PetSeeder extends Seeder {
  async run(dataSource: DataSource): Promise<void> {

    const pets: Pet[] = [];
    
    for (let i = 0; i < 10; i++) {
      const pet: Pet = new Pet();
      const {size, specie, age, sex, status, detail, area, img} = await getPetRandomData();

      Object.assign(pet, {
        size,
        specie,
        age,
        sex,
        status,
        detail,
        area,
        img
      });

      pets.push(pet);
    }

    await dataSource.createEntityManager().save<Pet>(pets);
  }
}
