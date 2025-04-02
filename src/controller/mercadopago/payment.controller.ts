import { Request, Response } from "express";
import {
  client,
  preference,
  payments,
  preapproval,
} from "../../config/mercado-pago";
import { handleHttpError } from "../../utils/error.handler";
import { Donation, Status } from "../../Model/Donation";

// const HOST = "https://www.google.com";
const NGROK_HOST = "https://real-violently-rabbit.ngrok-free.app";

export const paymentResponse = async (req: Request, res: Response) => {
  console.log("WEBHOOK RECIBIDO: ", req.body);
  res.sendStatus(200);
};

export const donationPref = async (req: Request, res: Response) => {
  const { title, unit_price } = req.body.donation;

  try {
    const body = {
      items: [
        {
          id: "1",
          title: title,
          unit_price: Number(unit_price),
          currency_id: "ARS",
          quantity: 1,
        },
      ],
      back_urls: {
        success: `${NGROK_HOST}/success`,
        failure: `${NGROK_HOST}/failure`,
        pending: `${NGROK_HOST}/pending`,
      },
      binary_mode: true,
      auto_return: "all",
      // notification_url: `${NGROK_HOST}/donation/webhooks/mercadopago`,
    };

    const response = await preference.create({ body });

    const donation = new Donation();

    Object.assign(donation, {
      amount: Number(unit_price),
      title,
      collector_id: response.collector_id,
      client_id: response.client_id,
      status: Status.PENDING,
      currency_id: response.items?.[0]?.currency_id || "ARS",
    });

    await donation.save();
    res.status(200).json(response.init_point);
  } catch (error) {
    handleHttpError(res, error);
  }
};

export const subscription = async (req: Request, res: Response) => {
  const { email } = req.body;

  const mount = 500;
  const frequency = "months";
  const body = {
    payer_email: email,
    reason: "Colaboración mensual",
    external_reference: "",
    // back_url: url,
    auto_recurring: {
      frequency: 1,
      frequency_type: frequency,
      transaction_amount: mount,
      currency_id: "ARS",
    },
  };

  try {
    const newPreapproval = await preapproval.create({ body });
    res.status(200).json(newPreapproval.init_point);
  } catch (error) {
    handleHttpError(res, error);
  }
};
