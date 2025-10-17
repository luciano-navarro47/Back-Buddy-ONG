import { Request } from "express";
import { payments } from "../../config/mercado-pago";
import { Order, Status as OrderStatus } from "../../entities/Order"; 
import AppDataSource from "../../config/data-source";

export const orderMerchantDbUpdate = async (req: Request) => {
    const type = req.body?.type;
    const data = req.body?.data;
    console.log("Order Db Update: ", req.body);
  
    try {
      if (type === "payment") {
        const paymentId = data?.id;
        if (!paymentId) {
          console.warn("Webhook payment sin id:", req.body);
          return;
        }
  
        // Intentamos obtener el payment; si no existe, logueamos y retornamos sin crashear.
        let paymentInfo;
        try {
          paymentInfo = await payments.get({ id: paymentId });
        } catch (err: any) {
          // Si la SDK/HTTP responde 404 -> Payment not found, lo manejamos
          if (err && (err.status === 404 || err.error === "not_found")) {
            console.warn(`Payment ${paymentId} no encontrado en Mercado Pago (posible id de prueba inválido).`);
            return;
          }
          // Otros errores re-lanzarlos para logueo superior
          console.error("Error inesperado al obtener payment:", err);
          return;
        }
  
        const externalReference = paymentInfo?.external_reference;
        if (!externalReference) {
          console.warn(`Payment ${paymentId} no tiene external_reference:`, paymentInfo);
          return;
        }
  
        const orderRepo = AppDataSource.getRepository(Order);
        const order = await orderRepo.findOne({
          where: { external_reference: externalReference },
          relations: ["items"],
        });
        if (!order) {
          console.warn("No se encontró orden local con external_reference:", externalReference);
          return;
        }
  
        const mpStatus = paymentInfo.status;
        if (mpStatus === "approved") order.status = OrderStatus.APPROVED;
        else if (mpStatus === "rejected" || mpStatus === "cancelled") order.status = OrderStatus.REJECTED;
        else order.status = OrderStatus.PENDING;
  
        order.payment_id = String(paymentId);
        order.raw_response = paymentInfo;
        await orderRepo.save(order);
        console.log(`Order actualizada: ${order.id} status=${order.status}`);
      }
  
      if (type === "merchant_order") {
        // Si quieres manejar merchant_order: similar, podrías pedir merchant_orders.get({ id: data.id })
        // y mapear merchant_order.id -> Merchant Order fields, o buscar por external_reference.
        console.log("Merchant_order webhook recibido:", data?.id);
        // Implementar si lo necesitas
      }
    } catch (error) {
      console.error("orderDbUpdate error inesperado:", error);
      return;
    }
  };