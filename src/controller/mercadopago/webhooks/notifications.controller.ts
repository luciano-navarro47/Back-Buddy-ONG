import { Request, Response } from "express";
import { donationDbUpdate } from "../donation.controller";
import { susbscriptionDbUpdate } from "../subscription.controller";

export const notificationsRecieved = async (req: Request, res: Response) => {
  let type = req.body.type;
  console.log("WEBHOOK: ", req.body);
  
  switch (type !== "") {
    case type === "payment" || type === "merchant_order":
      donationDbUpdate(req, res);
      return;
    case type === "subscription_preapproval":
      // console.log("subscription_preapproval");
      susbscriptionDbUpdate(req, res);
      return;
    default:
      console.log("Not matched");
      res.sendStatus(200);
      break;
  }
};
