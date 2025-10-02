import { Router } from "express";
import { createPreference } from "../../controller/mercadopago/preference.controller";

const preferenceRouter = Router();

preferenceRouter.post("/", createPreference);

export default preferenceRouter;
