import { Router } from "express";
import { notificationsRecieved } from "../controller/mercadopago/webhooks/notifications.controller";

const webhookRouter = Router();

webhookRouter.post("/notifications", notificationsRecieved)

export default webhookRouter;