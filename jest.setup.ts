import "reflect-metadata";
import AppDataSource from "./src/config/data-source";

beforeAll(async () => {
  // if (process.env.CI === "true") {
  //   Object.assign(AppDataSource, {
  //     host: "postgres",
  //     port: parseInt(process.env.DB_PORT || "5432"),
  //     username: process.env.DB_USER,
  //     password: process.env.DB_PASSWORD,
  //     database: process.env.TEST_DB_NAME,
  //   });
  // }
    await AppDataSource.initialize();
    console.log("Database connected!");
});

afterAll(async () => {
  if (AppDataSource.isInitialized) {
    await AppDataSource.destroy();
    console.log("Database connection closed!");
  }
});
