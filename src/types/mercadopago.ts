import { PreApprovalResponse } from "mercadopago/dist/clients/preApproval/commonTypes";

export interface ExtendedPreApprovalResponse extends PreApprovalResponse {
  subscription_id?: string;
}
