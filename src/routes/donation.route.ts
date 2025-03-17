import { Router } from "express";
import { donation, subscription } from "../controller/paymentMp";

const donationRouter = Router();

donationRouter.post('/', donation);
donationRouter.post("/subscription", subscription);

export default donationRouter;