import { Request, Response } from "express";
import {
  client,
  preference,
  payments,
  preapproval,
} from "../../config/mercado-pago";
import { handleHttpError } from "../../utils/error.handler";
import { Donation, Status } from "../../Model/Donation";
import { UUID } from "typeorm/driver/mongodb/bson.typings";

// import { UUID } from "typeorm/driver/mongodb/bson.typings";

// const HOST = process.env.BASE_URL;
// const url = `${HOST}/payment-response`;
const HOST = "https://www.google.com/";

export const paymentResponse = async (req: Request, res: Response) => {
  // console.log("PAGO RECIBIDO: ", req.query);
  console.log("PAGO RECIBIDO: ", req.body);
};

export const donationPref = async (req: Request, res: Response) => {
  const { title, unit_price } = req.body.donation;

  // console.log("REQ: ", req.body)
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
        success: `${HOST}/donation-success`,
        failure: `${HOST}/donation-failure`,
        pending: `${HOST}/donation-pending`,
      },
      binary_mode: true,
      auto_return: "all",
      notification_url: `${HOST}/webhook/mercadopago`
    };
    
    const response = await preference.create({ body });
    console.log("RESSSS: ", response);

    const donation = new Donation();
    
    Object.assign(donation, {
      amount: Number(unit_price),
      title,
      collector_id: response.collector_id,
      client_id: response.client_id,
      status: Status.PENDING,
      currency_id: response.items?.[0]?.currency_id || "ARS"
    });

    await donation.save();
    res.status(200).json(response.init_point);
  } catch (error) {
    console.log("ERRR: ", error);
    handleHttpError(res, error);
  }
};

// export const donationPayment = async (req: Request, res: Response) => {
//   console.log("REQQQQ: req.body", req.body);
//   const { title, unit_price } = req.body.donation;
//   try {
//     const body = {
//       items: [
//         {
//           id: "1",
//           title: title,
//           unit_price: Number(unit_price),
//           currency_id: "ARS",
//           quantity: 1,
//         },
//       ],
//       back_urls: {
//         success: url,
//         failure: url,
//         pending: url,
//       },
//       auto_return: "approved",
//     };

//     // Work here
//   } catch (error) {
//     handleHttpError(res, error);
//   }
// };

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
