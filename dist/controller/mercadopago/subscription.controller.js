"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.susbscriptionDbUpdate = exports.createSubscription = void 0;
const mercado_pago_1 = require("../../config/mercado-pago");
const error_handler_1 = require("../../utils/error.handler");
const Subscription_1 = require("../../entities/Subscription");
const data_source_1 = __importDefault(require("../../config/data-source"));
const url = process.env.NGROK_DOM;
const createSubscription = async (req, res) => {
    const { email, amount, currency_id } = req.body;
    try {
        const subscription = new Subscription_1.Subscription();
        subscription.payer_email = email;
        subscription.transaction_amount = amount;
        subscription.reason = "Colaboración mensual";
        subscription.status = Subscription_1.SubscriptionStatus.PENDING;
        const frequency = "months";
        const body = {
            payer_email: email,
            reason: `Te suscribirás a una colaboración mensual de ${amount}`,
            auto_recurring: {
                frequency: 1,
                frequency_type: frequency,
                transaction_amount: amount,
                currency_id,
            },
            back_url: `${url}/success`,
            status: "pending",
            notification_url: `${url}/webhooks/notifications`,
            external_reference: subscription.id,
        };
        const newPreapproval = await mercado_pago_1.preapproval.create({ body });
        subscription.payer_id = newPreapproval.payer_id;
        subscription.frequency = newPreapproval.auto_recurring?.frequency;
        subscription.frequency_type = newPreapproval.auto_recurring
            ?.frequency_type;
        subscription.currency_id = newPreapproval.auto_recurring?.currency_id;
        subscription.subscription_id = newPreapproval.subscription_id;
        await Subscription_1.Subscription.save(subscription);
        res.status(200).json(newPreapproval.init_point);
    }
    catch (error) {
        (0, error_handler_1.handleHttpError)(res, error);
    }
};
exports.createSubscription = createSubscription;
const susbscriptionDbUpdate = async (req, res) => {
    try {
        const preapprovalId = req.body.data.id;
        const preapprovalInfo = await mercado_pago_1.preapproval.get({ id: preapprovalId });
        const subscriptionRepo = data_source_1.default.getRepository(Subscription_1.Subscription);
        const subscriptionRecord = await subscriptionRepo.findOneBy({
            id: preapprovalInfo.external_reference,
        });
        if (subscriptionRecord) {
            subscriptionRecord.status =
                preapprovalInfo.status === "authorized"
                    ? Subscription_1.SubscriptionStatus.AUTHORIZED
                    : preapprovalInfo.status === "pending"
                        ? Subscription_1.SubscriptionStatus.PENDING
                        : preapprovalInfo.status === "cancelled"
                            ? Subscription_1.SubscriptionStatus.CANCELLED
                            : Subscription_1.SubscriptionStatus.PENDING;
            await subscriptionRepo.save(subscriptionRecord);
        }
        res.sendStatus(200);
    }
    catch (error) {
        (0, error_handler_1.handleHttpError)(res, error);
    }
};
exports.susbscriptionDbUpdate = susbscriptionDbUpdate;
