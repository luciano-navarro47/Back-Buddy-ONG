import { faker } from "@faker-js/faker";
import { Seeder } from "@jorgebodega/typeorm-seeding";
import { DataSource } from "typeorm/data-source";

import { Pet, Size, Specie, Sex, Age, Status } from "../../../../Model/Pet";
import { getPetRandomData } from "../../../../utils/getRandomData";

export default class PetSeeder extends Seeder {
  async run(dataSource: DataSource): Promise<void> {

    const pets: Pet[] = [];
    const species: Specie[] = Object.values(Specie);
    
    for (let i = 0; i < 10; i++) {

      const randomIndex = Math.floor(Math.random() * species.length);
      const randomSpecie = species[randomIndex] as Specie;
      const image = await getPetRandomData(randomSpecie)

      const pet: Pet = new Pet();
      Object.assign(pet, {
        size: faker.helpers.arrayElement(Object.values(Size)),
        specie: randomSpecie,
        age: faker.helpers.arrayElement(Object.values(Age)),
        img: image,
        detail: faker.lorem.sentences(),
        area: `${faker.location.streetAddress()} ${faker.location.buildingNumber()}`,
        sex: faker.helpers.arrayElement(Object.values(Sex)),
        status: faker.helpers.arrayElement(Object.values(Status)),
      });

      pets.push(pet);
    }

    await dataSource.createEntityManager().save<Pet>(pets);
  }
}
