import { Request, Response } from "express";
import { payments } from "../../config/mercado-pago";


// ✅ Procesar el pago (lo usa el Payment Brick)
export const processPayment = async (req: Request, res: Response) => {
    try {
      const paymentData = req.body;
  
      const result = await payments.create({
        body: {
          transaction_amount: Number(paymentData.transactionAmount),
          token: paymentData.token,
          description: paymentData.description || "Compra en Buddy ONG",
          installments: paymentData.installments,
          payment_method_id: paymentData.paymentMethodId,
          issuer_id: paymentData.issuerId,
          payer: {
            email: paymentData.payer.email,
            identification: {
              type: paymentData.payer.identification.type,
              number: paymentData.payer.identification.number,
            },
            first_name: paymentData.payer.firstName,
            last_name: paymentData.payer.lastName,
          },
          additional_info: {
            items: paymentData.items?.map((item: any) => ({
              id: String(item.id),
              title: item.name,
              description: item.description || "",
              quantity: Number(item.quantity),
              unit_price: Number(item.price),
            })),
          },
        },
        requestOptions: {
          idempotencyKey: paymentData.idempotencyKey || crypto.randomUUID(),
        },
      });
  
      return res.status(201).json(result);
    } catch (error: any) {
      console.error("Error procesando pago:", error);
      return res.status(500).json({ error: error.message });
    }
  };
  
