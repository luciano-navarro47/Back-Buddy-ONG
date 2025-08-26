import { Seeder } from "@jorgebodega/typeorm-seeding";
import { DataSource } from "typeorm/data-source";

import { Product } from "../../../../entities/Product";
import { getProductRandomData } from "../../../../utils/getRandomData";

export default class ProductSeeder extends Seeder {
  async run(dataSource: DataSource): Promise<void> {
    const products: Product[] = [];

    for (let i = 0; i < 10; i++) {
      const product = new Product();
      const { category, images, name, description, price, stock } =
        await getProductRandomData();

      Object.assign(product, {
        category,
        images,
        name,
        description,
        price,
        stock,
      });

      products.push(product);
    }

    await dataSource.createEntityManager().save<Product>(products);
  }
}
