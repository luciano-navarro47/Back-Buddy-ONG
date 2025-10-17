import { Request, Response } from "express";
import { donationDbUpdate } from "../donation.controller";
import { subscriptionDbUpdate } from "../subscription.controller";
import { orderMerchantDbUpdate } from "../order-merchant.controller";
import { handleHttpError } from "../../../utils/error.handler";

export const notificationsRecieved = async (req: Request, res: Response) => {
  const type = req.body?.type;
  console.log("Webhook recibido:", req.body);

  if (!res.headersSent) {
    res.sendStatus(200);
  }

  try {
    switch (true) {
      case type.includes("payment"): {
        await donationDbUpdate(req);
        break;
      }
      case type.includes("topic_merchant_order_wh"):
        await orderMerchantDbUpdate
      default:
        break;
    }
    // if (type === "payment" || type === "topic_merchant_order_wh") {
    //   // await donationDbUpdate(req);
    //   await orderDbUpdate(req);
    //   return
    // }

    // if (type === "subscription_preapproval") {
    //   await subscriptionDbUpdate(req);
    //   return
    // }

    // console.log("Webhook: tipo no manejado:", type);
    return;
  } catch (error) {
    console.error("notificationsRecieved error general:", error);
    return;
  }
};
