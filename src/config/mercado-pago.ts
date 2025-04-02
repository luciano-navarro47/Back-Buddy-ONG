import { MercadoPagoConfig, Preference, Payment, PreApproval } from 'mercadopago';
import * as dotenv from "dotenv";
dotenv.config();

if (!process.env.MP_ACCESS_TOKEN) {
    throw new Error('MP_ACCESS_TOKEN is required');
}

export const client = new MercadoPagoConfig({
    accessToken: process.env.MP_ACCESS_TOKEN
});

export const payments = new Payment(client);

export const preference = new Preference(client);

export const preapproval = new PreApproval(client);