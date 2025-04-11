import { PreApprovalResponse } from "mercadopago/dist/clients/preApproval/commonTypes";

declare global {
  interface ExtendedPreApprovalResponse extends PreApprovalResponse {
    subscription_id?: string;
  }
}

export {};
