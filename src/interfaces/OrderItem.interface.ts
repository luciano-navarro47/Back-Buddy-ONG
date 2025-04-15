
export interface IOrderItem {
    id: string;
    product_id: string;
    name: string;
    unit_price: number;
    quantity: number;
    discount: number;
    subtotal: number;
}