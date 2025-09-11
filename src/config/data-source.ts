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

const isDevEnv = process.env.NODE_ENV === "dev";
const isProdEnv = process.env.NODE_ENV === "prod";

const AppDataSource = new DataSource({
  type: "postgres",
  host: isProdEnv ? process.env.DB_HOST : process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "5432"),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: isDevEnv
    ? process.env.TEST_DB_NAME
    : isProdEnv
    ? process.env.DB_NAME
    : process.env.DB_NAME,
  url: isProdEnv ? process.env.DB_URL : undefined,
  synchronize: !isProdEnv,
  ssl: isProdEnv ? { rejectUnauthorized: false } : false,
  entities: [
    Product,
    User,
    Pet,
    Veterinary,
    Customer,
    Card,
    Subscription,
    Donation,
    CardSubscription,
  ],
  migrations: ["dist/migrations/*.js"],
  subscribers: isDevEnv ? ["dist/subscribers/*.js"] : ["src/subscribers/*.ts"],
});

export default AppDataSource;
