import { Seeder } from "@jorgebodega/typeorm-seeding";
import { DataSource } from "typeorm/data-source";

import { getVeterinaryRandomData } from "../../../../utils/getRandomData";
import { Veterinary } from "../../../../entities/Veterinary";

export default class VeterinarySeeder extends Seeder {
  async run(dataSource: DataSource): Promise<void> {
    const veterinaries: Veterinary[] = [];

    for (let i = 0; i < 10; i++) {
      const veterinary = new Veterinary();
      const {image, name, description, phone, location, address, email} = await getVeterinaryRandomData();

      Object.assign(veterinary, {
        image,
        name,
        description,
        phone,
        location,
        address,
        email
      });

      veterinaries.push(veterinary);
    }

    await dataSource.createEntityManager().save<Veterinary>(veterinaries);
  }
}
