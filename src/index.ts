import "reflect-metadata";
import AppDataSource from "./config/data-source";
import server from "./app";
import * as dotenv from "dotenv";
dotenv.config();

const isProdEnv = process.env.NODE_ENV === "production";
const HOST = isProdEnv ? "0.0.0.0" : "localhost";
const PORT = Number(process.env.PORT) || 8080;

const DB_RETRY_ATTEMPTS = parseInt(process.env.DB_RETRY_ATTEMPTS || "5");
const DB_RETRY_BASE_MS = parseInt(process.env.DB_RETRY_BASE_MS || "2000");

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const tryInitializeDB = async (): Promise<boolean> => {
  for (let attempt = 1; attempt <= DB_RETRY_ATTEMPTS; attempt++) {
    try {
      console.log(
        `Attempt ${attempt} of ${DB_RETRY_ATTEMPTS} to connect to DB...`
      );
      await AppDataSource.initialize();
      console.log("Database connected");
      return true;
    } catch (error) {
      console.error("❌ Error connecting to DB:", error);
      if (attempt < DB_RETRY_ATTEMPTS) {
        const backoff = DB_RETRY_BASE_MS * Math.pow(2, attempt - 1);
        console.log(`Waiting ${backoff}ms before next attempt...`);
        await sleep(backoff);
        continue;
      } else {
        console.error("❌ Failed to connect to DB after all attempts.");
        return false;
      }
    }
  }
  return false;
};

const startServer = async () => {
  const dbConnected = await tryInitializeDB();

  if (!dbConnected) {
    console.error("❌ Failed to connect to DB after all attempts.");
    process.exit(1);
  }

  const httpServer = server.listen(PORT, HOST, () => {
    console.log(
      `🚀 Server running on http://${HOST}:${PORT} ${
        dbConnected ? "(DB connected)" : "(DB NOT connected - read-only mode)"
      } `
    );
  });

  const gracefulClose = async () => {
    console.log("🛑 SIGTERM received, closing...");
    try {
      if (AppDataSource.isInitialized) await AppDataSource.destroy();
    } catch (error) {
      console.error("Error destroying DB connections: ", error);
    }
    httpServer.close(() => {
      console.log("🛑 Server closed");
      process.exit(0);
    });
  };

  process.on("SIGTERM", gracefulClose);
  process.on("SIGINT", gracefulClose);
};

startServer();
