import express from "express";
import morgan from "morgan";
import router from "./routes/index";
import cors from "cors";
import "./config/mercado-pago";

const server = express();

server.use(express.json());
server.use(morgan("dev"));
server.use(cors());

server.use("/", router);

export default server;
