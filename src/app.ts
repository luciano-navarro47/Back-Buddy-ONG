import express from "express";
import morgan from "morgan";
import router from "./routes/index";
import cors from "cors";
import { MercadoPagoConfig } from 'mercadopago';
import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();

const server = express();

//options for cors midddleware
server.use(cors());

server.use(morgan("dev"));
server.use(express.json());
// server.use(cors(options));

//enable pre-flight
// router.options("cors", cors(options));

if (!process.env.MP_ACCESS_TOKEN) {
  throw new Error('MP_ACCESS_TOKEN is required');
}
// Initialize the client object
const client = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN });

// Old Implementation Version
// // SDK de Mercado Pago
// const mercadopago = require("mercadopago");
// // Add Credentials
// console.log("MP TOKEN: " + process.env.MP_ACCESS_TOKEN);
// mercadopago.configure({
//   access_token: process.env.MP_ACCESS_TOKEN
// });

server.use("/", router);

export default server;
