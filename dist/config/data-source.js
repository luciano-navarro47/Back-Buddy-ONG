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
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const dotenv = __importStar(require("dotenv"));
const Product_1 = require("../Model/Product");
const Pet_1 = require("../Model/Pet");
const User_1 = require("../Model/User");
const Veterinary_1 = require("../Model/Veterinary");
dotenv.config();
const isTestEnv = process.env.NODE_ENV === 'test';
const AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: isTestEnv ? process.env.TEST_DB_NAME : process.env.DB_NAME,
    synchronize: process.env.NODE_ENV !== 'production',
    entities: [Product_1.Product, Pet_1.Pet, User_1.User, Veterinary_1.Veterinary], // TO TEST WHITOUT CI
    // entities: ["dist/Model/*.js"]
    // logging: process.env.NODE_ENV !== 'production',
    // migrations: isTestEnv ? ["dist/migrations/*.ts"] : ["src/migrations/*.ts"],
    // subscribers: isTestEnv ? ["dist/subscribers/*.ts"] : ["src/subscribers/*.ts"],
});
exports.default = AppDataSource;
