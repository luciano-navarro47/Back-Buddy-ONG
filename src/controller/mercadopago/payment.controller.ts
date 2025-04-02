import { Request, Response } from "express";
import {
  client,
  payments,
  preference,
  preapproval,
} from "../../config/mercado-pago";
import { handleHttpError } from "../../utils/error.handler";
import { Donation, Status } from "../../Model/Donation";
import AppDataSource from "../../config/data-source";

const url = process.env.NGROK_DOM;

export const paymentResponse = async (req: Request, res: Response) => {
  try {
    if (req.body.type === "payment") {
      const paymentId = req.body.data.id;
      const paymentInfo = await payments.get({ id: paymentId });

      const donationRepo = AppDataSource.getRepository(Donation);
      const donation = await donationRepo.findOneBy({
        id: paymentInfo.external_reference,
      });
      if (donation) {
        donation.status =
          paymentInfo.status === "rejected" ? Status.FAILURE : 
          paymentInfo.status === "approved" ? Status.APPROVED : Status.PENDING;

        donation.payment_id = paymentId;
        await donationRepo.save(donation);
      }
    } else if (req.body.topic === "merchant_order") {
      // Do logic related to merchant order
      console.log("merchant_order notification recieved");
    }

    res.sendStatus(200);
  } catch (error) {
    handleHttpError(res, error);
  }
};

export const donationPref = async (req: Request, res: Response) => {
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
      notification_url: `${url}/donation/webhooks/mercadopago`,
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
