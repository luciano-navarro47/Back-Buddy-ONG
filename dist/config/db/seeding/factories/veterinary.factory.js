"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_seeding_1 = require("@jorgebodega/typeorm-seeding");
const getRandomData_1 = require("../../../../utils/getRandomData");
const Veterinary_1 = require("../../../../Model/Veterinary");
class VeterinarySeeder extends typeorm_seeding_1.Seeder {
    async run(dataSource) {
        const veterinaries = [];
        for (let i = 0; i < 10; i++) {
            const veterinary = new Veterinary_1.Veterinary();
            const { image, name, description, phone, location, address, email } = await (0, getRandomData_1.getVeterinaryRandomData)();
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
        await dataSource.createEntityManager().save(veterinaries);
    }
}
exports.default = VeterinarySeeder;
