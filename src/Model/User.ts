import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  OneToOne,
  OneToMany,
  DeleteDateColumn,
  JoinColumn,
  // ManyToOne,
} from "typeorm";

import { Pet } from "./Pet";
import { Customer } from "./Customer";
import { Card } from "./Card";
import { Subscription } from "./Subscription";

export enum Role {
	ADMIN = 'admin',
	USER = 'user'
}
export enum Status {
	ACTIVE = 'active',
	BANNED = 'banned'
}

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  name!: string;

  @Column()
  surname!: string;

  @Column()
  email!: string;

  @Column()
  password!: string;

  @Column()
  username!: string;

  @Column({ type: "bigint" })
  phone!: string;

  @Column({
    type: "enum",
    enum: Object.values(Role)
  })
  role!: Role;

  @Column({
    type: "enum",
    enum: Object.values(Status)
  })
  status!: Status;
  
  @OneToOne(() => Customer, { cascade: true, eager: true })
  @JoinColumn({ name: "mp_customer_id"})
  customer?: Customer;

  @OneToMany(() => Pet, (pet) => pet.user)
  pets!: Pet[];

  @OneToMany(() => Subscription, (subscriptions) => subscriptions.user)
  subscriptions?: Subscription[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @DeleteDateColumn()
  deletedAt!: Date;
}
