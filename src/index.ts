import "reflect-metadata";
import database from "./config/data-source";
import server from "./app";

const PORT = 3001;

const startServer = async () => {
  try {
    await database.initialize();
    console.log("Database connected");

    if (process.env.CI) {
      console.log("Running in CI mode, skipping server start.");
      await database.destroy();
      process.exit(0);
    }

    const app = server.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });

    process.on("SIGTERM", async () => {
      console.log("🛑 SIGTERM received, closing...");
      await database.destroy();
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
