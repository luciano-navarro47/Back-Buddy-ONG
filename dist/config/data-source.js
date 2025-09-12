"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const typeorm_1 = require("typeorm");
const Product_1 = require("../entities/Product");
const User_1 = require("../entities/User");
const Pet_1 = require("../entities/Pet");
const Veterinary_1 = require("../entities/Veterinary");
const Customer_1 = require("../entities/Customer");
const Card_1 = require("../entities/Card");
const Subscription_1 = require("../entities/Subscription");
const CardSubscription_1 = require("../entities/CardSubscription");
const Donation_1 = require("../entities/Donation");
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const isDevEnv = process.env.NODE_ENV === "dev";
const isProdEnv = process.env.NODE_ENV === "prod";
const AppDataSource = new typeorm_1.DataSource({
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
        Product_1.Product,
        User_1.User,
        Pet_1.Pet,
        Veterinary_1.Veterinary,
        Customer_1.Customer,
        Card_1.Card,
        Subscription_1.Subscription,
        Donation_1.Donation,
        CardSubscription_1.CardSubscription,
    ],
    migrations: [path_1.default.join(__dirname, "..", "migrations", "*{.ts,.js}")],
    subscribers: isDevEnv
        ? [path_1.default.join(__dirname, "../subscribers/*.js")]
        : [path_1.default.join(__dirname, "../subscribers/*.ts")],
});
exports.default = AppDataSource;
