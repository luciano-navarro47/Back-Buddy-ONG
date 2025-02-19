import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	UpdateDateColumn,
	BaseEntity, // para poder hacer el create, findByOne, etc
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
	//uuid funcionando
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
	species!: Specie;

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
	@CreateDateColumn()
	createdAt!: Date;
	@UpdateDateColumn()
	updatedAt!: Date;

	@ManyToOne(() => User, (user) => user.pet, { cascade: true })
	user?: User;
}
