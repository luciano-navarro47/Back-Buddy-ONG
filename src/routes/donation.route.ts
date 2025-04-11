import { Router } from "express";
import {
  createDonation,
} from "../controller/mercadopago/donation.controller";

const donationRouter = Router(); 

donationRouter.post("/", createDonation);

export default donationRouter;
