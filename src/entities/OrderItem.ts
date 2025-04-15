import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
} from "typeorm";
import { Order } from "./Order";
import { Product } from "./Product";

@Entity()
export class OrderItem {
    @PrimaryGeneratedColumn("uuid") id!: string;
    @Column("uuid") product_id!: string;
    @Column() name!: string;
    @Column("decimal") unit_price!: number;
    @Column("int") quantity!: number;
    @Column("decimal", { default: 0 }) discount?: number;
    @Column("decimal") subtotal!: number;
    @ManyToOne(() => Order, order => order.items) order!: Order;
    @ManyToOne(() => Product) product!: Product;
}