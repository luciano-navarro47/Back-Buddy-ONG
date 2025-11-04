import "reflect-metadata";
import AppDataSource from "./config/data-source";
import server from "./app";
import * as dotenv from "dotenv";
dotenv.config();

const isProdEnv = process.env.NODE_ENV === "production";
const HOST = isProdEnv ? "0.0.0.0" : "localhost";
const PORT = Number(process.env.PORT) || 8080;

const startServer = async () => {
  let dbConnected = false;

  try {
    console.log("Initializing DB...");
    await AppDataSource.initialize();
    console.log("Database connected");
    dbConnected = true;
  } catch (error) {
    console.error("❌ Error connecting to DB:", error);
    console.warn("⚠️ Continuing startup without DB connection (temporary hotfix).");
    // NO HACER process.exit(1) — arrancamos el servidor igual
  }

  // Start the HTTP server even if DB failed
  const httpServer = server.listen(PORT, HOST, () => {
    console.log(`🚀 Server running on http://${HOST}:${PORT} ${dbConnected ? "(DB connected)" : "(DB NOT connected - read-only mode)"} `);
  });

  // graceful shutdown handlers (pueden usar AppDataSource.destroy si dbConnected)
  process.on("SIGTERM", async () => {
    console.log("🛑 SIGTERM received, closing...");
    try {
      if (dbConnected) await AppDataSource.destroy();
    } catch (error) {
      console.error("Error destroying DB connections: ", error);
    }
    httpServer.close(() => {
      console.log("🛑 Server closed");
      process.exit(0);
    });
  });

  process.on("SIGINT", async () => {
    console.log("🛑 SIGINT received, closing...");
    try {
      if (dbConnected) await AppDataSource.destroy();
    } catch (error) {
      console.error("Error destroying DB connections: ", error);
    }
    httpServer.close(() => {
      console.log("🛑 Server closed");
      process.exit(0);
    });
  });
};

startServer();
