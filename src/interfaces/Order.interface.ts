import { Status } from "../entities/Order";

export interface IOrder {
    id: string;
    status: Status;
    external_reference: string;
    merchant_order_id: string;
    user_id: string;
    buyer_name: string;
    buyer_email: string;
    total_amount: number;
    currency: string;
    discount_amount: number;
    payment_method_id: string;
    installments: number;
    shipping_cost: number;
    shipping_address: string;
    billing_address: string;
    raw_response: any;
    created_at: Date;
    updated_at: Date;
}