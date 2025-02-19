import { faker } from "@faker-js/faker";
import { Seeder } from "@jorgebodega/typeorm-seeding";
import { DataSource } from "typeorm/data-source";

import { Category, Product } from "../../../../Model/Product";
import { getCategoryRandomData } from "../../../../utils/getRandomData";

export default class ProductSeeder extends Seeder {
    async run(dataSource: DataSource): Promise<void> {
        
        const categories = Object.values(Category);
        const products : Product[] = [];

        for (let i = 0; i < 20; i++) {
            
            const randomIndex = Math.floor(Math.random() * categories.length);
            let randomCategory = categories[randomIndex] as Category;
            const product = new Product();
            const { description, image } = await getCategoryRandomData(randomCategory);

            Object.assign(product, {
                image: image,
                name: `Producto N°${i+1}`,
                description: description,
                price: faker.number.int({min: 500, max: 15000}),
                stock: faker.number.int({min: 0, max: 100}),
                category: randomCategory
            });

            products.push(product);
        }

        await dataSource.createEntityManager().save<Product>(products);
    }
}