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
      await donationDbUpdate(req);
      await orderDbUpdate(req);
      return res.sendStatus(200);
    }

    if (type === "subscription_preapproval") {
      await susbscriptionDbUpdate(req); 
      return res.sendStatus(200);
    }

    console.log("Webhook: tipo no manejado:", type);
    return res.sendStatus(200);
  } catch (error) {
    console.error("notificationsRecieved error general:", error);
    handleHttpError(res, error);
    return res.sendStatus(200); // siempre 200 para MP
  }
};
