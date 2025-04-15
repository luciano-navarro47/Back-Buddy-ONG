import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
} from "typeorm";

export enum Category {
  FOOD = "food",
  TOYS = "toys",
  CLOTHING = "clothing",
  ACCESSORIES = "accessories",
  BEDS = "beds",
  HYGIENE = "hygiene",
  HEALTHCARE = "healthcare",
  BOWLS = "bowls",
  CARRIERS = "carriers",
  LITTER = "litter",
  OTHER = "other",
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
  image_url!: string;

  @Column()
  name!: string;

  @Column()
  description?: string;

  @Column("decimal", { precision: 7, scale: 2 })
  price!: number;

  @Column()
  stock!: number;

  @CreateDateColumn()
  createdAt!: Date;
  
  @UpdateDateColumn()
  updatedAt!: Date;
}
