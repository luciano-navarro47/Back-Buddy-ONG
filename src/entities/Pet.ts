import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  ManyToOne,
  JoinColumn,
  Check,
} from "typeorm";
import { User } from "./User";

export enum Size {
  SMALL = "small",
  MEDIUM = "medium",
  LARGE = "large",
}
export enum Specie {
  DOG = "dog",
  CAT = "cat",
}
export enum Age {
  PUPPY = "puppy",
  YOUNG = "young",
  ADULT = "adult",
}
export enum Sex {
  MALE = "male",
  FEMALE = "female",
}

export enum PostType {
  WANTED = "wanted",
  ABANDONED = "abandoned",
  IN_ADOPTION = "in_adoption",
}

export enum CaseStatus {
  OPEN = "open",
  RESOLVED = "resolved",
  ADOPTED = "adopted",
}

@Entity({ name: "pet" })
@Check(`jsonb_array_length(images) = 3`)
@Check(`name IS NULL OR length(name) >= 3`)
@Check("number IS NULL OR (number >= 10 AND number <= 99999)")
export class Pet extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "text", nullable: true })
  name?: string;

  @Column({ type: "enum", enum: Object.values(Size) })
  size!: Size;

  @Column({ type: "enum", enum: Object.values(Specie) })
  specie!: Specie;

  @Column({ type: "enum", enum: Object.values(Age) })
  age!: Age;

  // jsonb to obtain compatibility with cross-DB (Postgres well supported). Alternative: text[] in Postgres.
  @Column({
    type: "text",
    array: true,
    nullable: false,
    default: () =>
      "ARRAY['placeholder-1','placeholder-2','placeholder-3']::text[]",
  })
  images!: string[];

  @Column({
    type: "text",
    array: true,
    nullable: true,
    default: () => "ARRAY[]::text[]",
  })
  videos?: string[];

  @Column({ type: "text", nullable: true })
  detail?: string;

  @Column({ type: "text", nullable: false })
  street!: string;

  @Column({ type: "int", nullable: true })
  number?: number;

  @Column({ type: "text", nullable: false })
  city!: string;

  @Column({ type: "enum", enum: Object.values(Sex), nullable: true })
  sex?: Sex;

  @Column({
    type: "enum",
    enum: Object.values(PostType),
    default: PostType.IN_ADOPTION,
  })
  postType!: PostType;

  @Column({
    type: "enum",
    enum: Object.values(CaseStatus),
    default: CaseStatus.OPEN,
  })
  caseStatus!: CaseStatus;

  @ManyToOne(() => User, (user) => user.pets)
  @JoinColumn({ name: "userId" })
  user?: User;

  @Column({ type: "timestamp", nullable: true })
  foundAt?: Date;

  @Column({ type: "timestamp", nullable: true })
  resolvedAt?: Date;

  @Column({ type: "uuid", nullable: true })
  adopterId?: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
