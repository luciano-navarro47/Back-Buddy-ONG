import { Request, Response } from "express";
import { preference } from "../../config/mercado-pago";
import { handleHttpError } from "../../utils/error.handler";
import { Order, Status as OrderStatus } from "../../entities/Order"; 
import { OrderItem } from "../../entities/OrderItem";
import AppDataSource from "../../config/data-source";
import { randomUUID } from "crypto";

const FRONTEND_BASE2 = process.env.FRONTEND_BASE || process.env.NGROK_DOM;
const WEBHOOK_URL = process.env.WEBHOOK_URL || `${FRONTEND_BASE2}/webhooks/notifications`;
/**
 * Crea una preferencia para el carrito:
 * - valida payload
 * - crea Order + OrderItems (persistidos)
 * - llama a preference.create de MercadoPago
 * - actualiza order con preference_id, raw_response y devuelve init_point
 */
export const createCartPreference = async (req: Request, res: Response) => {
  try {
    const { cart, userInfo, currency_id = "ARS", shipping_cost = 0, metadata = {} } = req.body;

    if (!Array.isArray(cart) || cart.length === 0) {
      return res.status(400).json({ error: "Cart is required and must be a non-empty array" });
    }

    // --- Validación y mapeo de items para MP ---
    const mpItems: any[] = [];
    let totalAmount = 0;
    for (const p of cart) {
      const quantity = Number(p.quantity);
      const unit_price = Number(p.unit_price);

      if (!p.id || !p.name || Number.isNaN(unit_price) || Number.isNaN(quantity) || unit_price < 0 || quantity <= 0) {
        return res.status(400).json({ error: "Each cart item must have id, name, unit_price (>=0), and quantity (>0)" });
      }

      mpItems.push({
        id: String(p.id),
        title: p.name,
        picture_url: p.image || undefined,
        quantity,
        unit_price,
        currency_id,
      });
      totalAmount += unit_price * quantity;
    }

    // --- Crear Order localmente (persistir antes de llamar a MP) ---
    // Generamos external_reference ahora (lo usaremos para MP)
    const externalReference = randomUUID();

    const orderRepo = AppDataSource.getRepository(Order);
    const order = orderRepo.create();
    order.external_reference = externalReference;
    order.user_id = userInfo.id; // ajustar según tu auth (si no hay, dejar null)
    order.status = OrderStatus.PENDING;
    order.total_amount = totalAmount;
    order.currency = currency_id;
    order.discount_amount = 0;
    order.shipping_cost = Number(shipping_cost || 0);
    order.buyer_email = (userInfo?.email) ?? null;
    order.buyer_name = (userInfo?.fullName);
    order.billing_address = (userInfo?.billing_address) ?? null;
    order.raw_response = {}; // placeholder, lo actualizaremos luego

    // persistir order inicial (no items aún)
    await orderRepo.save(order);

    // --- Crear OrderItem(s) y asociarlos (cascade: true lo guardará con order.save()) ---
    const orderItems: OrderItem[] = [];
    for (const p of cart) {
      const item = new OrderItem();
      item.product_id = p.id; // espera UUID
      item.name = p.name;
      item.unit_price = Number(p.price);
      item.quantity = Number(p.quantity ?? 1);
      item.discount = 0;
      item.subtotal = item.unit_price * item.quantity;
      item.order = order;
      orderItems.push(item);
    }

    // asignar items y guardar (cascade guardará OrderItem)
    order.items = orderItems;
    await orderRepo.save(order);

    // --- Construir body de preferencia MP ---
    const prefBody = {
      items: mpItems,
      external_reference: externalReference,
      back_urls: {
        success: `${FRONTEND_BASE2}/success`,
        failure: `${FRONTEND_BASE2}/failure`,
        pending: `${FRONTEND_BASE2}/pending`,
      },
      notification_url: WEBHOOK_URL,
      auto_return: "all",
      statement_descriptor: "Buddy ONG",
      operation_type: "regular_payment",
      shipments: {
        // opcional; si no entregás, podés removerlo
        cost: Number(shipping_cost || 0),
        mode: "not_specified",
      },
    };

    // idempotency: usa header o genera uno (reintentos seguros)
    const idempotencyKey = (req.headers["x-idempotency-key"] as string) || randomUUID();

    // --- Crear preferencia en MP ---
    const mpResponse = await preference.create({
      body: prefBody,
      requestOptions: { idempotencyKey },
    });

    // --- Actualizar order con datos de la preferencia MP ---
    // Remove preference_id since it doesn't exist in Order entity
    order.merchant_order_id = mpResponse?.collector_id?.toString() ?? undefined;
    order.raw_response = mpResponse;
    await orderRepo.save(order);

    // --- Responder al frontend con init_point y preference_id ---
    return res.status(200).json({
      init_point: mpResponse.init_point,
      preference_id: mpResponse.id,
      external_reference: externalReference,
      orderId: order.id,
    });
  } catch (error) {
    return handleHttpError(res, error);
  }
};