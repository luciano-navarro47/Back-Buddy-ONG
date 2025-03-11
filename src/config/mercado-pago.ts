import { MercadoPagoConfig } from "mercadopago";
import * as dotenv from "dotenv";
dotenv.config();

if (!process.env.MP_ACCESS_TOKEN) {
    throw new Error('MP_ACCESS_TOKEN is required');
  }

const mercadoPagoClient = new MercadoPagoConfig({ 
    accessToken: process.env.MP_ACCESS_TOKEN 
});

export default mercadoPagoClient;