import { MercadoPagoConfig } from "mercadopago";
import * as dotenv from "dotenv";
dotenv.config();

if (!process.env.ACCESS_TOKEN_MP) {
    throw new Error('MP_ACCESS_TOKEN is required');
  }

const mercadoPagoClient = new MercadoPagoConfig({ 
    accessToken: process.env.ACCESS_TOKEN_MP
});

export default mercadoPagoClient;