import "reflect-metadata";
import AppDataSource from "./config/data-source";
import server from "./app";
import * as dotenv from "dotenv";
dotenv.config();

const isProductionEnv = process.env.NODE_ENV === "production";
const PORT = process.env.PORT || 8080;

const startServer = async () => {
  try {
    await AppDataSource.initialize();
    console.log("Database connected");

    if (process.env.CI === "true") {
      console.log("Running in CI mode, skipping server start.");
      await AppDataSource.destroy();
      process.exit(0);
    }

    const app = server.listen(isProductionEnv ? PORT : 3001, () => {
      console.log(`🚀 Server running on port ${isProductionEnv ? PORT : 3001}`);
    });

    process.on("SIGTERM", async () => {
      console.log("🛑 SIGTERM received, closing...");
      await AppDataSource.destroy();
      app.close(() => {
        console.log("🛑 Server closed");
        process.exit(0);
      });
    });
  } catch (error) {
    console.error("❌ Error connecting to DB:", error);
    process.exit(1);
  }
};

startServer();
