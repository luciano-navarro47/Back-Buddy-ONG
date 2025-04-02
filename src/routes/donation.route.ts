import { Router } from "express";
import {
  donationPref,
  subscription,
//   donationPayment,
  paymentResponse,
} from "../controller/mercadopago/payment.controller";

const donationRouter = Router();

donationRouter.post("/", donationPref);
donationRouter.get("/payment-response", paymentResponse);
// donationRouter.post('/', donationPayment);
donationRouter.post("/subscription", subscription);

export default donationRouter;
