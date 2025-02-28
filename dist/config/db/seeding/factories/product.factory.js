"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_seeding_1 = require("@jorgebodega/typeorm-seeding");
const Product_1 = require("../../../../Model/Product");
const getRandomData_1 = require("../../../../utils/getRandomData");
class ProductSeeder extends typeorm_seeding_1.Seeder {
    async run(dataSource) {
        const products = [];
        for (let i = 0; i < 10; i++) {
            const product = new Product_1.Product();
            const { category, image, name, description, price, stock } = await (0, getRandomData_1.getProductRandomData)();
            Object.assign(product, {
                category,
                image,
                name,
                description,
                price,
                stock
            });
            products.push(product);
        }
        await dataSource.createEntityManager().save(products);
    }
}
exports.default = ProductSeeder;
