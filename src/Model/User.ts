import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  OneToMany,
  DeleteDateColumn,
} from "typeorm";

import { Pet } from "./Pet";

// export type Role = "admin" | "user";
// export type Status = "active" | "banned";
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

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @DeleteDateColumn()
  deletedAt!: Date;

  @OneToMany(() => Pet, (pet) => pet.user)
  pet!: Pet[];
}
