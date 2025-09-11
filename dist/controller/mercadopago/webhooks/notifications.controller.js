"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notificationsRecieved = void 0;
const donation_controller_1 = require("../donation.controller");
const subscription_controller_1 = require("../subscription.controller");
const notificationsRecieved = async (req, res) => {
    let type = req.body.type;
    switch (type !== "") {
        case type === "payment" || type === "merchant_order":
            (0, donation_controller_1.donationDbUpdate)(req, res);
            return;
        case type === "subscription_preapproval":
            (0, subscription_controller_1.susbscriptionDbUpdate)(req, res);
            return;
        default:
            console.log("Not matched");
            res.sendStatus(200);
            break;
    }
};
exports.notificationsRecieved = notificationsRecieved;
