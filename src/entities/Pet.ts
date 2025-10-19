import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { User } from "./User";

export enum Size { SMALL = "small", MEDIUM = "medium", LARGE = "large" }
export enum Specie { DOG = "dog", CAT = "cat" }
export enum Age { PUPPY = "puppy", YOUNG = "young", ADULT = "adult" }
export enum Sex { MALE = "male", FEMALE = "female" }

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

  // Uso jsonb para compatibilidad cross-DB (Postgres bien soportado). Alternativa: text[] en Postgres.
  @Column({ type: "jsonb", default: () => "'[]'" })
  images!: string[];

  @Column({ type: "text", nullable: true })
  detail?: string;

  @Column({ type: "text", nullable: true })
  area?: string;

  @Column({ type: "enum", enum: Object.values(Sex), nullable: true })
  sex?: Sex;

  @Column({ type: "enum", enum: Object.values(PostType), default: PostType.IN_ADOPTION })
  postType!: PostType;

  @Column({ type: "enum", enum: Object.values(CaseStatus), default: CaseStatus.OPEN })
  caseStatus!: CaseStatus;

  @ManyToOne(() => User, (user) => user.pets /* no cascade by default */)
  @JoinColumn({ name: "userId" })
  user?: User;

  @Column({ type: 'timestamp', nullable: true }) foundAt?: Date;
  @Column({ type: 'timestamp', nullable: true }) resolvedAt?: Date;
  @Column({ type: 'uuid', nullable: true }) adopterId?: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
