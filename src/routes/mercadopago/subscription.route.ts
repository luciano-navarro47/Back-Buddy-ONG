import { Router } from "express";
import {
  createSubscription,
} from "../../controller/mercadopago/subscription.controller";

const subscriptionRouter = Router();

subscriptionRouter.post("/", createSubscription);

export default subscriptionRouter;
