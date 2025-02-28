import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
} from "typeorm";

export enum Category {
  OTROS = "otros",
  INDUMENTARIA = "indumentaria",
  TAZAS = "tazas",
  ALIMENTOS = "alimentos",
}

@Entity()
export class Product extends BaseEntity {
  @Column({
    type: "enum",
    enum: Object.values(Category),
  })
  category!: Category;

  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  image!: string;

  @Column()
  name!: string;

  @Column()
  description?: string; //se puede poner ? en vex de !

  @Column()
  price!: number;

  @Column()
  stock!: number;

  @CreateDateColumn()
  createdAt!: Date;
  
  @UpdateDateColumn()
  updatedAt!: Date;
}
