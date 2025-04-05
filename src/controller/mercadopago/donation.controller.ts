import { Request, Response } from "express";
import {
  client,
  payments,
  preference,
  preapproval,
} from "../../config/mercado-pago";
import { handleHttpError } from "../../utils/error.handler";
import { Donation, Status } from "../../Model/Donation";

const url = process.env.NGROK_DOM;

export const createDonation = async (req: Request, res: Response) => {
  const { title, unit_price } = req.body.donation;

  try {
    const donation = new Donation();

    donation.title = title;
    donation.amount = Number(unit_price);
    donation.status = Status.PENDING;
    await donation.save();

    const body = {
      items: [
        {
          id: "1",
          title,
          unit_price: Number(unit_price),
          currency_id: "ARS",
          quantity: 1,
        },
      ],
      back_urls: {
        success: `${url}/success`,
        failure: `${url}/failure`,
        pending: `${url}/pending`,
      },
      auto_return: "approved",
      notification_url: `${url}/webhooks/mpNotifications`,
      external_reference: donation.id,
    };

    const response = await preference.create({ body });

    donation.collector_id = response?.collector_id;
    donation.client_id = Number(response.client_id);
    donation.currency_id = response.items?.[0]?.currency_id || "ARS";
    donation.preference_id = response.id;
    await donation.save();

    res.status(200).json(response.init_point);
  } catch (error) {
    handleHttpError(res, error);
  }
};