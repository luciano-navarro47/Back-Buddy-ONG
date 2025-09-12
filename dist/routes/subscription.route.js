"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const subscription_controller_1 = require("../controller/mercadopago/subscription.controller");
const subscriptionRouter = (0, express_1.Router)();
subscriptionRouter.post("/", subscription_controller_1.createSubscription);
exports.default = subscriptionRouter;
