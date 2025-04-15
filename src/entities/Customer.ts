import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  OneToOne,
  OneToMany,
  DeleteDateColumn,
  PrimaryColumn,
  JoinColumn,
} from "typeorm";

import { User } from "./User";
import { Card } from "./Card";
import { Subscription } from "./Subscription";
import { Donation } from "./Donation";

@Entity()
export class Customer extends BaseEntity {
  @PrimaryColumn("varchar")
  mp_customer_id!: string;

  @Column("varchar")
  email!: string;

  @Column("varchar")
  first_name!: string;

  @Column({
    type: "varchar",
  })
  last_name!: string;

  @OneToOne(() => User, (user) => user.customer)
  user?: User;

  @OneToMany(() => Card, (card) => card.customer)
  cards!: Card[];

  @OneToMany(() => Subscription, (subscriptions) => subscriptions.customer)
  @JoinColumn({ name: "subscription_id" })
  subscriptions?: Subscription[];

  @OneToMany(() => Donation, (donations) => donations.customer)
  donations?: Donation[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @DeleteDateColumn()
  deletedAt!: Date;
}
