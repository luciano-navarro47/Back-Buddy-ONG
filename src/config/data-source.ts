import { DataSource } from "typeorm";
import * as dotenv from "dotenv";
dotenv.config();

const isTestEnv = process.env.NODE_ENV === 'test';

export default new DataSource({
	type: "postgres",
	host: process.env.DB_HOST || 'postgres',
	port: Number(process.env.DB_PORT),
	username: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: isTestEnv ? process.env.TEST_DB_NAME : process.env.DB_NAME,
	synchronize: isTestEnv,
	logging: false,
	entities: ["src/Model/*.ts"],
	migrations: ["src/migrations/*.ts"],
	subscribers: ["src/subscribers/*.ts"],
  });