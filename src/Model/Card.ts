import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  DeleteDateColumn,
  JoinColumn,
  PrimaryColumn,
  ManyToOne,
} from "typeorm";

import { User } from "./User";
import { Subscription } from "./Subscription";
import { subscription } from "../controller/mercadopago/payment.controller";
import { Customer } from "./Customer";

@Entity()
export class Card extends BaseEntity {
  @PrimaryColumn("varchar")
  id!: string;

  @Column({ type: "int" })
  expiration_month!: number;

  @Column({ type: "int" })
  expiration_year!: number;

  @Column({ type: "varchar", length: 4 })
  last_four_digit!: string;

  @ManyToOne(() => Customer, (customer) => customer.cards)
  @JoinColumn({ name: "customer_id" })
  customer?: User;

  @ManyToOne(() => Subscription, (subscription) => subscription.card)
  @JoinColumn({ name: "subscription_id" })
  subscription?: Subscription[]

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @DeleteDateColumn()
  deletedAt!: Date;
}
