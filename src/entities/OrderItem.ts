import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  RelationId,
} from "typeorm";
import { Order } from "./Order";
import { Product } from "./Product";

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn("uuid") id!: string;
  @Column() name!: string;
  @Column("decimal") unit_price!: number;
  @Column("int") quantity!: number;
  @Column("decimal", { default: 0 }) discount?: number;
  @Column("decimal") subtotal!: number;

  @ManyToOne(() => Order, (order) => order.items)
  @JoinColumn({ name: "order_id" })
  order!: Order;

  @ManyToOne(() => Product)
  @JoinColumn({ name: "product_id" })
  product!: Product;

  @RelationId((orderItem: OrderItem) => orderItem.product)
  product_id!: string;
}
