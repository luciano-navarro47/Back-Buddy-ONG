import AppDataSource from "./src/config/data-source";

beforeAll(async () => {
  await AppDataSource.initialize();
});

afterAll(async () => {
  if (AppDataSource.isInitialized) {
    await AppDataSource.destroy();
  }
});
