import express from "express";
import morgan from "morgan";
import router from "./routes/index";
import cors from "cors";
import { MercadoPagoConfig } from 'mercadopago';
import * as dotenv from "dotenv";
dotenv.config();

const server = express();

//options for cors midddleware
server.use(cors());

server.use(morgan("dev"));
server.use(express.json());

server.use("/", router);

export default server;
