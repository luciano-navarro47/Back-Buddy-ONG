import { Request, Response } from "express";
import { donationDbUpdate } from "../donation.controller";
import { subscriptionDbUpdate } from "../subscription.controller";
import { orderMerchantDbUpdate } from "../order-merchant.controller";

export const notificationsRecieved = async (req: Request, res: Response) => {
  const type = req.body?.type;

  if (!res.headersSent) {
    res.sendStatus(200);
  }

  try {
    switch (true) {
      case type.includes("payment"): {
        await donationDbUpdate(req);
        break;
      }
      case type.includes("topic_merchant_order_wh"): {
        await orderMerchantDbUpdate(req);
        break;
      }
      case type.includes("order"): {
        console.log("Order type webhook no handled: ", req.body);
        break;
      }
      case type.includes("subscription_preapproval"): {
        await subscriptionDbUpdate(req);
        break;
      }
      default:
        console.log("Webhook: tipo no manejado:", type);
        break;
    }
    return;
  } catch (error) {
    console.error("notificationsRecieved error general:", error);
    return;
  }
};
