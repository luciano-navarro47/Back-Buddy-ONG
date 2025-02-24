"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = __importDefault(require("./src/config/data-source"));
beforeAll(async () => {
    await data_source_1.default.initialize();
});
afterAll(async () => {
    await data_source_1.default.destroy();
});
