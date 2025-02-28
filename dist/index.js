"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const data_source_1 = __importDefault(require("./config/data-source"));
const app_1 = __importDefault(require("./app"));
const PORT = 3001;
const startServer = async () => {
    try {
        await data_source_1.default.initialize();
        console.log("Database connected");
        if (process.env.CI === "true") {
            console.log("Running in CI mode, skipping server start.");
            await data_source_1.default.destroy();
            process.exit(0);
        }
        const app = app_1.default.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
        });
        process.on("SIGTERM", async () => {
            console.log("🛑 SIGTERM received, closing...");
            await data_source_1.default.destroy();
            app.close(() => {
                console.log("🛑 Server closed");
                process.exit(0);
            });
        });
    }
    catch (error) {
        console.error("❌ Error connecting to DB:", error);
        process.exit(1);
    }
};
startServer();
