import { Router } from "express";
import { createCartPreference } from "../../controller/mercadopago/cart.controller";

const preferenceRouter = Router();

preferenceRouter.post("/", createCartPreference);

export default preferenceRouter;
