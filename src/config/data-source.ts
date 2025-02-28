import { DataSource } from "typeorm";
import * as dotenv from "dotenv";
import { Product } from "../Model/Product";
import { User } from "../Model/User";
import { Pet } from "../Model/Pet";
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
	entities: [Product, User, Pet, Veterinary],
	migrations: ["dist/migrations/*.js"],
	subscribers: isTestEnv ? ["dist/subscribers/*.js"] : ["src/subscribers/*.ts"],
  });

export default AppDataSource;