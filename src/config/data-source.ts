import { DataSource } from "typeorm";
import * as dotenv from "dotenv";
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
	entities: ["dist/Model/*.ts"],
	migrations: ["dist/migrations/*.ts"],
	subscribers: ["dist/subscribers/*.ts"],
  });