"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const data_source_1 = __importDefault(require("./config/data-source"));
const app_1 = __importDefault(require("./app"));
const PORT = 3001;
data_source_1.default
    .initialize()
    .then(() => {
    console.log("DB connect");
})
    .catch(console.error);
app_1.default.listen(PORT, () => {
    console.log("Running on port " + PORT);
});
