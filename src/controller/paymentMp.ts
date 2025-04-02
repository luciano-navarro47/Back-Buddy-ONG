// import { Request, Response } from "express";
// import { PreApproval } from 'mercadopago';
// import { client, preference } from "../config/mercado-pago";
// import { handleHttpError } from "../utils/error.handler";

// const url = "https://buddyong.vercel.app/home";

// export const paymentMp = async (req: Request, res: Response) => {
//   let objProduct;
//   if (req.body.cart) {
//     const { cart } = req.body;
//     objProduct = cart.map((value: any) => ({
//       id: value.id,
//       title: value.name,
//       unit_price: value.price,
//       currency_id: "ARS",
//       quantity: value.amount,
//     }));
//   }
//   if (req.body.donation) {
//     const { donation } = req.body;

//     objProduct = [
//       {
//         title: "Donación",
//         unit_price: donation.unit_price,
//         currency_id: "ARS",
//         quantity: 1,
//       },
//     ];
//   }

//   try {
//     const response = await preference.create({
//       body: {
//         items: objProduct,
//         back_urls: { success: url },
//         binary_mode: true,
//       }
//     });
    
//     res.json(response.init_point);
//   } catch (error) {
//     handleHttpError(res, error);
//   }
// };

// export const subscription = async (req: Request, res: Response) => {
//   try {
//     const preapproval = new PreApproval(client);
//     const response = await preapproval.create({
//       body: {
//         payer_email: req.body.email,
//         reason: "Colaboración mensual",
//         external_reference: "",
//         back_url: url,
//         auto_recurring: {
//           frequency: 1,
//           frequency_type: "months",
//           transaction_amount: 500,
//           currency_id: "ARS",
//         }
//       }
//     });

//     res.json(response.init_point);
//   } catch (error) {
//     handleHttpError(res, error);
//   }
// };
