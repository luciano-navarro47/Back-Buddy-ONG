import { Router } from "express";
import { subscriptionNotification } from "../controller/webhooks/mpSubscription.controller";
import { paymentResponse } from "../controller/webhooks/mpNotifications.controller";

const webhookRouter = Router();

webhookRouter.post("/mpNotifications", paymentResponse)
webhookRouter.post("/mpSubscriptions", subscriptionNotification);

export default webhookRouter;