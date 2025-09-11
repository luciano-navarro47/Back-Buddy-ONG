"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_seeding_1 = require("@jorgebodega/typeorm-seeding");
const User_1 = require("../../../../entities/User");
const getRandomData_1 = require("../../../../utils/getRandomData");
class UserSeeder extends typeorm_seeding_1.Seeder {
    async run(dataSource) {
        const users = [];
        for (let i = 0; i < 10; i++) {
            const user = new User_1.User();
            const { first_name, last_name, email, password, username, phone, role, status } = await (0, getRandomData_1.getUserRandomData)();
            Object.assign(user, {
                first_name,
                last_name,
                email,
                password,
                username,
                phone,
                role,
                status,
            });
            users.push(user);
        }
        await dataSource.createEntityManager().save(users);
    }
}
exports.default = UserSeeder;
