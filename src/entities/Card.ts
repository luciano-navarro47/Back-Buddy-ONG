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
  ManyToMany,
  OneToMany,
} from "typeorm";

import { Subscription } from "./Subscription";
import { Customer } from "./Customer";
import { CardSubscription } from "./CardSubscription";

@Entity()
export class Card extends BaseEntity {
  @PrimaryColumn({ type: "varchar" })
  id!: string;

  @Column({ type: "int" })
  expiration_month!: number;

  @Column({ type: "int" })
  expiration_year!: number;

  @Column({ type: "varchar", length: 4 })
  last_four_digit!: string;

  @ManyToOne(() => Customer, (customer) => customer.cards)
  @JoinColumn({ name: "customer_id" })
  customer?: Customer;

  @ManyToMany(() => Subscription, (subscription) => subscription.cards)
  @JoinColumn({ name: "card_subscription" })
  subscriptions!: Subscription[];

  @OneToMany(() => CardSubscription, (cardSubscription) => cardSubscription.card)
  cardSubscriptions!: CardSubscription[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @DeleteDateColumn()
  deletedAt!: Date;
}
