import { DataSource } from "typeorm";
import * as dotenv from "dotenv";
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
	entities: ["src/entities/*.ts"],
	migrations: ["dist/migrations/*.js"],
	subscribers: isTestEnv ? ["dist/subscribers/*.js"] : ["src/subscribers/*.ts"],
  });

export default AppDataSource;