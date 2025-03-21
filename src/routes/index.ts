import { Router } from "express";
import petsRouter from "./pets.router";
import userRouter from "./user.router";
import productRouter from "./product.router";
import veterinaryRouter from "./veterinay.router";
import donationRouter from "./donation.route";
import loginRouter from "./login.router";
import loginAuth0Router from "./loginAuth0";

const router = Router();

router.use("/login", loginRouter);
router.use("/loginAuth0", loginAuth0Router);
router.use("/pets", petsRouter);
router.use("/user", userRouter);
router.use("/products", productRouter);
router.use("/veterinary", veterinaryRouter);
router.use("/donation", donationRouter);

export default router;
