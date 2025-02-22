import { DataSource } from "typeorm";
// import { Pet } from "../Model/Pet";
// import { User } from "../Model/User";
// import { Product } from "../Model/Product";
// import { Veterinary } from "../Model/Veterinary";
import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();

const isTestEnv = process.env.NODE_ENV === 'test';

export default new DataSource({
	type: "postgres",
	host: process.env.DB_HOST,
	port: Number(process.env.DB_PORT),
	username: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: isTestEnv ? process.env.TEST_DB_NAME : process.env.DB_NAME, // Usa DB de prueba si está en entorno de test
	synchronize: isTestEnv, // Solo sincroniza en tests para evitar problemas en producción
	logging: false,
	entities: ["src/Model/*.ts"],
	migrations: ["src/migrations/*.ts"],
	subscribers: ["src/subscribers/*.ts"],
  });

// export default new DataSource({
// 	name: "default",
// 	type: "postgres",
// 	url: process.env.DB_DEPLOY,
// 	entities: [Pet, User, Product, Veterinary],
// 	synchronize: true,
// 	logging: false,
// });
