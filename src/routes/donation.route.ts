import { Router } from "express";
import { donation, subscription } from "../controller/mercadopago/payment.controller";

const donationRouter = Router();

donationRouter.post('/', donation);
donationRouter.post("/subscription", subscription);

export default donationRouter;