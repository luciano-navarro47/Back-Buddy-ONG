"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const donation_controller_1 = require("../controller/mercadopago/donation.controller");
const donationRouter = (0, express_1.Router)();
donationRouter.post("/", donation_controller_1.createDonation);
exports.default = donationRouter;
