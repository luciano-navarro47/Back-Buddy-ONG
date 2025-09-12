import "reflect-metadata";
import AppDataSource from "./config/data-source";
import server from "./app";
import { User } from "./entities/User";
import * as dotenv from "dotenv";
dotenv.config();

const PORT = 3001;

const startServer = async () => {
  try {
    await AppDataSource.initialize();
    console.log("Database connected");

    if (process.env.CI === "true") {
      console.log("Running in CI mode, skipping server start.");
      await AppDataSource.destroy();
      process.exit(0);
    }

    const app = server.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
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
