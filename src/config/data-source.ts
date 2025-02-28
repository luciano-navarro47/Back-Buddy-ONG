import { DataSource } from "typeorm";
import * as dotenv from "dotenv";
import { Product } from "../Model/Product";
import { Pet } from "../Model/Pet";
import { User } from "../Model/User";
import { Veterinary } from "../Model/Veterinary";
dotenv.config();

const isTestEnv = process.env.NODE_ENV === 'test';

const AppDataSource = new DataSource({
	type: "postgres",
	host: process.env.DB_HOST || 'localhost',
	port: parseInt(process.env.DB_PORT || '5432'),
	username: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: isTestEnv ? process.env.TEST_DB_NAME : process.env.DB_NAME,
	synchronize: process.env.NODE_ENV !== 'production',
	entities: [Product, Pet, User, Veterinary], // TO TEST WHITOUT CI
	// entities: ["dist/Model/*.js"]
	// logging: process.env.NODE_ENV !== 'production',
	// migrations: isTestEnv ? ["dist/migrations/*.ts"] : ["src/migrations/*.ts"],
	// subscribers: isTestEnv ? ["dist/subscribers/*.ts"] : ["src/subscribers/*.ts"],
  });

export default AppDataSource;