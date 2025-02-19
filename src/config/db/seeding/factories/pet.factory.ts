import { faker } from "@faker-js/faker";
import { Seeder } from "@jorgebodega/typeorm-seeding";
import { DataSource } from "typeorm/data-source";

import { Pet, Size, Specie, Sex, Age, Status } from "../../../../Model/Pet";

export default class PetSeeder extends Seeder {

    async run(dataSource: DataSource) {

        const pets: Pet[] = [];

        for (let i = 0; i < 50; i++) {
          const pet: Pet = new Pet();
          Object.assign(pet, {
              size: faker.helpers.arrayElement(Object.values(Size)),
              species: faker.helpers.arrayElement(Object.values(Specie)),
              age: faker.helpers.arrayElement(Object.values(Age)),
              img: faker.image.urlPicsumPhotos({width: 200, height: 200}),
              detail: faker.lorem.sentences(),
              area: `${faker.location.streetAddress()} ${faker.location.buildingNumber()}`,
              sex: faker.helpers.arrayElement(Object.values(Sex)),
              status: faker.helpers.arrayElement(Object.values(Status))
          });
          pets.push(pet);
        }

        await dataSource.createEntityManager().save<Pet>(pets);
    }
  }