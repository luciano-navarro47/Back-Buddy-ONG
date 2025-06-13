import { DataSource } from "typeorm";
import { Product } from "../entities/Product";
import { User } from "../entities/User";
import { Pet } from "../entities/Pet";
import { Veterinary } from "../entities/Veterinary";
import { Customer } from "../entities/Customer";
import { Card } from "../entities/Card";
import { Subscription } from "../entities/Subscription";
import { CardSubscription } from "../entities/CardSubscription";
import { Donation } from "../entities/Donation";
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
	entities: [Product, User, Pet, Veterinary, Customer, Card, Subscription, Donation, CardSubscription],
	migrations: ["dist/migrations/*.js"],
	subscribers: isTestEnv ? ["dist/subscribers/*.js"] : ["src/subscribers/*.ts"],
  });

export default AppDataSource;