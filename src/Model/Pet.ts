import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  ManyToOne,
} from "typeorm";

import { User } from "./User";

export enum Size {
  PEQUEÑO = "pequeño",
  MEDIANO = "mediano",
  GRANDE = "grande",
}

export enum Specie {
  PERRO = "perro",
  GATO = "gato",
}

export enum Age {
  CACHORRO = "cachorro",
  JOVEN = "joven",
  ADULTO = "adulto",
}

export enum Sex {
  MACHO = "macho",
  HEMBRA = "hembra",
}

export enum Status {
  PERDIDO = "perdido",
  ENCONTRADO = "encontrado",
  ADOPTADO = "adoptado",
}

@Entity()
export class Pet extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({
    type: "enum",
    enum: Object.values(Size),
  })
  size!: Size;

  @Column({
    type: "enum",
    enum: Object.values(Specie),
  })
  specie!: Specie;

  @Column({
    type: "enum",
    enum: Object.values(Age),
  })
  age!: Age;

  @Column()
  img!: string;

  @Column()
  detail!: string;

  @Column()
  area!: string;

  @Column({
    type: "enum",
    enum: Object.values(Sex),
  })
  sex!: Sex;

  @Column({
    type: "enum",
    enum: Object.values(Status),
  })
  status!: Status;

  @ManyToOne(() => User, (user) => user.pets, { cascade: true })
  user?: User;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
