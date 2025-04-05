import { Request, Response } from "express";
import { preapproval } from "../../config/mercado-pago";
import { handleHttpError } from "../../utils/error.handler";
import { FrequencyType, Subscription, SubscriptionStatus } from "../../Model/Subscription";

const url = process.env.NGROK_DOM;
export const createSubscription = async (req: Request, res: Response) => {
  const { email, amount, currency_id } = req.body;

  try {
    const subscription = new Subscription();
    subscription.payer_email = email;
    subscription.transaction_amount = amount;
    subscription.reason = "Suscripto a colaboración mensual."
    subscription.status = SubscriptionStatus.PENDING;

    const frequency = "months";
    const body = { 
      payer_email: email,
      reason: `Te suscribirás a una colaboración mensual de: `,
      auto_recurring: {
        frequency: 1,
        frequency_type: frequency,
        transaction_amount: amount,
        currency_id,
      },
      back_url: `${url}/success`,
      status: "pending",
      notification_url: `${url}/webhooks/mpSubscriptions`,
      external_reference: subscription.id,
    };

    const newPreapproval = await preapproval.create({ body });
    console.log("Preapproval: ", newPreapproval);
    subscription.payer_id = newPreapproval.payer_id;
    subscription.frequency = newPreapproval.auto_recurring?.frequency;
    subscription.frequency_type = newPreapproval.auto_recurring?.frequency_type as FrequencyType;
    subscription.currency_id = newPreapproval.auto_recurring?.currency_id;
    subscription.subscription_id = newPreapproval.subscription_id

    await Subscription.save(subscription);

    res.status(200).json(newPreapproval.init_point);
  } catch (error) {
    handleHttpError(res, error);
  }
};
