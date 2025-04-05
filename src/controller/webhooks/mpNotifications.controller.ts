import { Request, Response } from "express";
import { payments } from "../../config/mercado-pago";
import { handleHttpError } from "../../utils/error.handler";
import { Donation, Status } from "../../Model/Donation";
import AppDataSource from "../../config/data-source";
export const paymentResponse = async (req: Request, res: Response) => {
  try {
    console.log("PAYMENT WEBHOOK: ", req.body);
    
    if (req.body.type === "payment") {
      const paymentId = req.body.data.id;
      const paymentInfo = await payments.get({ id: paymentId });

      const donationRepo = AppDataSource.getRepository(Donation);
      const donation = await donationRepo.findOneBy({
        id: paymentInfo.external_reference,
      });
      // console.log("DONATION FOUNDED: ", donation);
      if (donation) {
        donation.status =
          paymentInfo.status === "rejected"
            ? Status.FAILURE
            : paymentInfo.status === "approved"
            ? Status.APPROVED
            : Status.PENDING;

        donation.payment_id = paymentId;
        await donationRepo.save(donation);
        return;
      }
    } else if (req.body.topic === "merchant_order") {
      // Do logic related to merchant order
      // console.log("merchant_order notification recieved: ", req.body);
    }

    res.sendStatus(200);
  } catch (error) {
    handleHttpError(res, error);
  }
};
