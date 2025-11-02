import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    BaseEntity,
    OneToMany,
} from "typeorm";
import { OrderItem } from "./OrderItem";

export enum Status {
    PENDING = "pending",
    APPROVED = "approved",
    REJECTED = "rejected",
    CANCELLED = "cancelled",
};

@Entity()
export class Order extends BaseEntity {
    @PrimaryGeneratedColumn("uuid") id!: string;
    @Column() external_reference!: string;
    @Column({ nullable: true }) merchant_order_id?: string;
    @Column("uuid") user_id!: string;
    @Column() buyer_name?: string;
    @Column() buyer_email?: string;
    @Column({ type: "enum", enum: Object.values(Status),}) status!: Status;
    @Column("decimal") total_amount!: number;
    @Column() currency!: string;
    @Column("decimal", { default: 0 }) discount_amount?: number;
    @Column({ nullable: true }) payment_method_id?: string;
    @Column("int", { default: 1 }) installments?: number;
    @Column("decimal", { default: 0 }) shipping_cost?: number;
    @Column("json", { nullable: true }) shipping_address?: string;
    @Column("json", { nullable: true }) billing_address!: string;
    @Column("json") raw_response: any;
    @CreateDateColumn() created_at!: Date;
    @UpdateDateColumn() updated_at!: Date;

    @OneToMany(() => OrderItem, item => item.order, { cascade: true })
    items!: OrderItem[];
}