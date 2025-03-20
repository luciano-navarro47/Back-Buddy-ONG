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