import { Request, Response } from "express";
import { donationDbUpdate } from "../donation.controller";
import { susbscriptionDbUpdate } from "../subscription.controller";
import { orderDbUpdate } from "../cart.controller";
import { handleHttpError } from "../../../utils/error.handler";

export const notificationsRecieved = async (req: Request, res: Response) => {
  const type = req.body?.type;
  console.log("Webhook recibido:", req.body);

  try {
    if (type === "payment" || type === "merchant_order") {
      await donationDbUpdate(req, res);
      await orderDbUpdate(req, res);
      return; // ya se envió la respuesta dentro de los helpers
    }

    if (type === "subscription_preapproval") {
      await susbscriptionDbUpdate(req, res);
      return;
    }

    console.log("Webhook: tipo no manejado:", type);
    return res.sendStatus(200);
  } catch (error) {
    console.error("notificationsRecieved error general:", error);
    return res.sendStatus(200);
  }
};
