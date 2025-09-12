"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const notifications_controller_1 = require("../controller/mercadopago/webhooks/notifications.controller");
const webhookRouter = (0, express_1.Router)();
webhookRouter.post("/notifications", notifications_controller_1.notificationsRecieved);
exports.default = webhookRouter;
