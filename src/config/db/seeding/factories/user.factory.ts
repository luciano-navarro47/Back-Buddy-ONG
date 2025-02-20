import { Seeder } from "@jorgebodega/typeorm-seeding";
import { DataSource } from "typeorm/data-source";

import { User } from "../../../../Model/User";
import { getUserRandomData } from "../../../../utils/getRandomData";

export default class UserSeeder extends Seeder {
  async run(dataSource: DataSource): Promise<void> {
    const users: User[] = [];

    for (let i = 0; i < 10; i++) {
      const user = new User();
      const {name, surname, email, password, username, phone, role, status} = await getUserRandomData();

      Object.assign(user, {
        name,
        surname,
        email,
        password,
        username,
        phone,
        role,
        status,
      });

      users.push(user);
    }

    await dataSource.createEntityManager().save<User>(users);
  }
}
