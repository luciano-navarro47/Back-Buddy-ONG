import { Request, Response } from "express";
import { preapproval } from "../../config/mercado-pago";
import { Subscription, SubscriptionStatus } from "../../Model/Subscription";
import { handleHttpError } from "../../utils/error.handler";
import AppDataSource from "../../config/data-source";

export const subscriptionNotification = async (req: Request, res: Response) => {
  try {
    console.log("SUBSCRIPTION WEBHOOK BODY: ", req.body);
    console.log("SUBSCRIPTION WEBHOOK QUERY: ", req.query);
    
    // Supongamos que el evento para actualizaciones de suscripciones viene con type "preapproval"
    // if (req.body.type === "preapproval") {
    //   const preapprovalId = req.body.data.id;
      
    //   // Obtenemos información completa de la suscripción desde la API de Mercado Pago
    //   const preapprovalInfo = await preapproval.get({ id: preapprovalId });
    //   console.log("INFO PREAPPROVAL: ", preapprovalInfo);

    //   // Usamos external_reference para encontrar la suscripción en nuestra BD
    //   const subscriptionRepo = AppDataSource.getRepository(Subscription);
    //   const subscriptionRecord = await subscriptionRepo.findOneBy({
    //     id: preapprovalInfo.external_reference,
    //   });
      
    //   if (subscriptionRecord) {
    //     // Actualizamos el estado según lo que nos indique MP
    //     subscriptionRecord.status =
    //       preapprovalInfo.status === "authorized" ? SubscriptionStatus.AUTHORIZED :
    //       preapprovalInfo.status === "pending" ? SubscriptionStatus.PENDING :
    //       preapprovalInfo.status === "cancelled" ? SubscriptionStatus.CANCELLED :
    //       SubscriptionStatus.PENDING;
        
    //     // También puedes actualizar otros campos, como la fecha del próximo pago, etc.
    //     await subscriptionRepo.save(subscriptionRecord);
    //     console.log(`Suscripción actualizada: ${subscriptionRecord.id} -> ${subscriptionRecord.status}`);
    //   } else {
    //     console.warn("No se encontró la suscripción con external_reference:", preapprovalInfo.external_reference);
    //   }
    // }
    
    res.sendStatus(200);
  } catch (error) {
    handleHttpError(res, error);
  }
};