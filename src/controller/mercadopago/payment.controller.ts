import { Request, Response } from "express";
import { MercadoPagoConfig, Preference, PreApproval } from "mercadopago";
import { handleHttpError } from "../../utils/error.handler";

const url = "https://buddyong.vercel.app/home";

const client = new MercadoPagoConfig({
  accessToken: process.env.ACCESS_TOKEN_MP || "",
});

const preference = new Preference(client);
const preapproval = new PreApproval(client);

export const donation = async (req: Request, res: Response) => {
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
        success: url,
        failure: url,
        pending: url,
      },
      auto_return: "approved",
    };

    const newPreference = await preference.create({ body });
    res.status(200).json(newPreference.init_point);
  } catch (error) {
    handleHttpError(res, "INTERNAL_SERVER_ERROR", 500);
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
    back_url: url,
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
  } catch (err) {
    handleHttpError(res, "Error creating subscription", 500);
  }
};
