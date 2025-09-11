"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.donationDbUpdate = exports.createDonation = void 0;
const mercado_pago_1 = require("../../config/mercado-pago");
const error_handler_1 = require("../../utils/error.handler");
const Donation_1 = require("../../entities/Donation");
const data_source_1 = __importDefault(require("../../config/data-source"));
const url = process.env.NGROK_DOM;
const createDonation = async (req, res) => {
    const { title, unit_price } = req.body.donation;
    try {
        const donation = new Donation_1.Donation();
        donation.title = title;
        donation.amount = Number(unit_price);
        donation.status = Donation_1.Status.PENDING;
        await donation.save();
        const body = {
            items: [
                {
                    id: "1",
                    title,
                    unit_price: Number(unit_price),
                    currency_id: "ARS",
                    quantity: 1,
                },
            ],
            back_urls: {
                success: `${url}/success`,
                failure: `${url}/failure`,
                pending: `${url}/pending`,
            },
            notification_url: `${url}/webhooks/notifications`,
            external_reference: donation.id,
        };
        const response = await mercado_pago_1.preference.create({ body });
        donation.collector_id = response?.collector_id;
        donation.client_id = Number(response.client_id);
        donation.currency_id = response.items?.[0]?.currency_id || "ARS";
        donation.preference_id = response.id;
        await donation.save();
        res.status(200).json(response.init_point);
    }
    catch (error) {
        (0, error_handler_1.handleHttpError)(res, error);
    }
};
exports.createDonation = createDonation;
const donationDbUpdate = async (req, res) => {
    try {
        const { type, data } = req.body;
        if (type === "payment") {
            const paymentId = data.id;
            const paymentInfo = await mercado_pago_1.payments.get({ id: paymentId });
            const donationRepo = data_source_1.default.getRepository(Donation_1.Donation);
            const donation = await donationRepo.findOneBy({
                id: paymentInfo.external_reference,
            });
            if (donation) {
                const status = paymentInfo.status;
                donation.status =
                    status === "rejected"
                        ? Donation_1.Status.FAILURE
                        : status === "approved"
                            ? Donation_1.Status.APPROVED
                            : Donation_1.Status.PENDING;
                donation.payment_id = paymentId;
                await donationRepo.save(donation);
            }
        }
        res.sendStatus(200);
    }
    catch (error) {
        (0, error_handler_1.handleHttpError)(res, error);
    }
};
exports.donationDbUpdate = donationDbUpdate;
