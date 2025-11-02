import { Router } from "express";
import petsRouter from "./pets.router";
import userRouter from "./user.router";
import productRouter from "./product.router";
import veterinaryRouter from "./veterinay.router";
import donationRouter from "./mercadopago/donation.route";
import subscriptionRouter from "./mercadopago/subscription.route";
import loginRouter from "./login.router";
import webhookRouter from "./webhook.routes";
import preferenceRouter from "./mercadopago/preference.route";

const router = Router();

router.use("/donation", donationRouter);
router.use("/login", loginRouter);
router.use("/pet", petsRouter);
router.use("/preference", preferenceRouter);
router.use("/products", productRouter);
router.use("/subscription", subscriptionRouter);
router.use("/user", userRouter);
router.use("/veterinary", veterinaryRouter);
router.use("/webhooks", webhookRouter);

export default router;
