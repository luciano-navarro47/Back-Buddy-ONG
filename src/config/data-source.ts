import path from "path";
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
import { Order } from "../entities/Order";
import { OrderItem } from "../entities/OrderItem";
dotenv.config();

const isDevEnv = process.env.NODE_ENV === "development";
const isProdEnv = process.env.NODE_ENV === "production";
const isCompiled = path.extname(__filename).includes(".js");

const AppDataSource = new DataSource({
  type: "postgres",
  ...(isProdEnv && process.env.DATABASE_URL
    ? { url: process.env.DATABASE_URL }
    : {
        host: process.env.DB_HOST || "localhost",
        port: parseInt(process.env.DB_PORT || "5432"),
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: isDevEnv ? process.env.TEST_DB_NAME : process.env.DB_NAME,
      }),
  synchronize: !isProdEnv,
  ssl: isProdEnv ? ({ rejectUnauthorized: false } as any) : false,

  connectTimeoutMS: parseInt(process.env.DB_CONNECT_TIMEOUT_MS || "60000"),
  extra: {
    max: parseInt(process.env.PG_MAX_CLIENTS || "5"),
    connectionTimeoutMillis: parseInt(
      process.env.PG_CONN_TIMEOUT_MS || "20000"
    ),
  },

  entities: [
    Card,
    CardSubscription,
    Customer,
    Donation,
    Order,
    OrderItem,
    Pet,
    Product,
    Subscription,
    User,
    Veterinary,
  ],
  subscribers: isCompiled
    ? [path.join(__dirname, "../subscribers/*.js")]
    : [path.join(__dirname, "../subscribers/*.ts")],
  migrations: [path.join(__dirname, "..", "migrations", "*{.ts,.js}")],
});

export default AppDataSource;
