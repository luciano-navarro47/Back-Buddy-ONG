import { Router } from "express";
import petsRouter from "./pets.router";
import userRouter from "./user.router";
import productRouter from "./product.router";
import veterinaryRouter from "./veterinay.router";
import donationRouter from "./donation.route";
import subscriptionRouter from "./subscription.route";
import loginRouter from "./login.router";
import webhookRouter from "./webhook.routes";

const router = Router();

router.use("/login", loginRouter);
router.use("/pet", petsRouter);
router.use("/user", userRouter);
router.use("/products", productRouter);
router.use("/veterinary", veterinaryRouter);
router.use("/donation", donationRouter);
router.use("/subscription", subscriptionRouter);
router.use("/webhooks", webhookRouter);

export default router;
