import { Request } from "express";
import AppDataSource from "../../config/data-source";
import { Order, Status as OrderStatus } from "../../entities/Order";

const MP_ACCESS_TOKEN = process.env.MP_ACCESS_TOKEN;

export const orderMerchantDbUpdate = async (req: Request) => {
  const merchantOrderId = req.body.id;

  try {
    if (!merchantOrderId) {
      console.warn("Webhook order-merchant without ID:", req.body);
      return;
    }

    try {
      const url = `https://api.mercadopago.com/merchant_orders/${merchantOrderId}`;
      const resp = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${MP_ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
      });

      if (!resp.ok) {
        const txt = await resp.text();
        console.error(
          "Error fetching merchant_order from MP:",
          resp.status,
          txt
        );
        return;
      }

      const merchantOrder = await resp.json();

      const orderRepo = await AppDataSource.getRepository(Order);
      const merchantOrderToUpdate = await orderRepo.findOne({
        where: { external_reference: merchantOrder.external_reference },
        relations: ["items"],
      });
      if (!merchantOrderToUpdate) {
        return;
      }

      if (merchantOrder.status === "closed") {
        merchantOrderToUpdate.status = OrderStatus.APPROVED;
      } else if (merchantOrder.status === "expired") {
        merchantOrderToUpdate.status = OrderStatus.CANCELLED;
      }
      orderRepo.save(merchantOrderToUpdate);
      return;
    } catch (err: any) {
      console.log("ERR ORDER-MERCH: ", err);
      if (err && (err.status === 404 || err.error === "not_found")) {
        console.warn(
          `Order merchant ${merchantOrderId} not founded in MercadoPago (invalid test ID maybe).`
        );
        return;
      }
      return;
    }
  } catch (error) {
    console.error("Unexpected error:", error);
    return;
  }
};
