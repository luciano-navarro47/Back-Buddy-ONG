"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const paymentMp_1 = require("../controller/paymentMp");
const paymentMp_2 = require("../controller/paymentMp");
const donationRouter = (0, express_1.Router)();
donationRouter.post('/', paymentMp_1.paymentMp);
donationRouter.post("/subscription", paymentMp_2.subscription);
exports.default = donationRouter;
