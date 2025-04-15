import {
    Entity,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    BaseEntity,
    DeleteDateColumn,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
  } from "typeorm";

import { Customer } from "./Customer";

export enum Status {
  APPROVED = "approved",
  PENDING = "pending",
  FAILURE = "failure",
}

  
  @Entity()
  export class Donation extends BaseEntity {

    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column("int")
    amount!: number;

    @Column({ nullable: true })
    currency_id?: string;

    @Column({ nullable: true })
    title?: string;

    @Column({
      nullable: true,
      type: "bigint"
    })
    collector_id?: number;

    @Column({
      nullable: true,
      type: "bigint"
    })
    client_id?: number;

    @Column({
      type: "enum",
      enum: Object.values(Status),
      default: Status.PENDING
    })
    status!: string;

    @Column({
      nullable: true,
      type: "varchar"
    })
    preference_id?: string;

    @Column({ 
      nullable: true,
      type: "bigint",
    })
    payment_id?: number;

    @ManyToOne(() => Customer, (customer) => customer.donations)
    @JoinColumn({ name: "donations_id" })
    customer?: Customer;

    @CreateDateColumn()
    createdAt!: Date;
  
    @UpdateDateColumn()
    updatedAt!: Date;
  
    @DeleteDateColumn()
    deletedAt!: Date;
  }