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
} from "typeorm";

import { Pet } from "./Pet";
import { Customer } from "./Customer";

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
  first_name!: string;

  @Column()
  last_name!: string;

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

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @DeleteDateColumn()
  deletedAt!: Date;
}
