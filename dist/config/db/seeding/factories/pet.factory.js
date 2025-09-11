"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_seeding_1 = require("@jorgebodega/typeorm-seeding");
const Pet_1 = require("../../../../entities/Pet");
const getRandomData_1 = require("../../../../utils/getRandomData");
class PetSeeder extends typeorm_seeding_1.Seeder {
    async run(dataSource) {
        const pets = [];
        for (let i = 0; i < 10; i++) {
            const pet = new Pet_1.Pet();
            const { size, specie, age, sex, status, detail, area, img } = await (0, getRandomData_1.getPetRandomData)();
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
        await dataSource.createEntityManager().save(pets);
    }
}
exports.default = PetSeeder;
