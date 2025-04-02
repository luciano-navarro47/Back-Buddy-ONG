import { Router } from "express";
import {
  donationPref,
  subscription,
  paymentResponse,
} from "../controller/mercadopago/payment.controller";

const donationRouter = Router();

donationRouter.post("/", donationPref);
donationRouter.post("/webhooks/mercadopago", paymentResponse);
donationRouter.post("/subscription", subscription);

export default donationRouter;
