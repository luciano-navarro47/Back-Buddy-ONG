import { Router } from "express";
import { processPayment } from "../../controller/mercadopago/payment.controller";

const processPaymentRouter = Router();

processPaymentRouter.post("/", processPayment);

export default processPaymentRouter;
