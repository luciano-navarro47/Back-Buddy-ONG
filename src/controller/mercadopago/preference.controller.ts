import { Request, Response } from "express";
import { preference } from "../../config/mercado-pago";

export const createPreference = async (req: Request, res: Response) => {
  try {
    const { cart } = req.body;

    const items = cart.map((product: any) => ({
      title: product.name,
      unit_price: Number(product.price),
      quantity: Number(product.amount),
      currency_id: "ARS", // o USD según corresponda
    }));

    const result = await preference.create({
      body: {
        items,
        back_urls: {
          success: "http://localhost:3000/success", // ajustar a tu frontend
          failure: "http://localhost:3000/failure",
          pending: "http://localhost:3000/pending",
        },
        auto_return: "approved",
      },
    });

    return res.status(200).json({
      id: result.id, // este es el preferenceId para el frontend
    });
  } catch (error) {
    console.error("Error creando preferencia:", error);
    return res.status(500).json({ error: "Error creando preferencia" });
  }
};
