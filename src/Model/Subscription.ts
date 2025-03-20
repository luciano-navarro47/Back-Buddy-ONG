import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    DeleteDateColumn,
    JoinColumn,
    BaseEntity,
    OneToOne,
  } from "typeorm";
  import { User } from "./User";
  import { Card } from "./Card";
  
  export enum SubscriptionStatus {
    PENDING = "pending",
    AUTHORIZED = "authorized",
  }
  
  export enum FrequencyType {
    DAYS = "days",
    MONTHS = "months",
  }
  
  @Entity()
  export class Subscription extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id!: string;
  
    @Column({ nullable: true })
    preapproval_plan_id?: string;
  
    @Column({ nullable: true })
    reason?: string;
  
    @Column({ nullable: true })
    external_reference?: string;
  
    @Column()
    payer_email!: string;
  
    @Column({ type: "bigint", nullable: true })
    payer_id?: number;
  
    @Column({ nullable: true })
    back_url?: string;
  
    @Column({ nullable: true })
    init_point?: string;
  
    @Column({ type: "enum", enum: SubscriptionStatus, default: SubscriptionStatus.PENDING })
    status!: SubscriptionStatus;
  
    @ManyToOne(() => User, (user) => user.subscriptions)
    @JoinColumn({ name: "user_id" })
    user!: User;
  
    @OneToOne(() => Card, (card) => card.subscription)
    card?: Card;
  
    // Setting Recurrence
    @Column({ type: "int", nullable: true })
    frequency?: number;
  
    @Column({ type: "enum", enum: FrequencyType, nullable: true })
    frequency_type?: FrequencyType;
  
    @Column({ type: "decimal", precision: 10, scale: 2, nullable: true })
    transaction_amount?: number;
  
    @Column({ nullable: true })
    currency_id?: string;
  
    @Column({ type: "timestamp", nullable: true })
    start_date?: Date;
  
    @Column({ type: "timestamp", nullable: true })
    end_date?: Date;
  
    @Column({ type: "timestamp", nullable: true })
    next_payment_date?: Date;
  
    @Column({ nullable: true })
    payment_method_id?: string;
  
    @CreateDateColumn()
    date_created!: Date;
  
    @UpdateDateColumn()
    last_modified!: Date;
  
    @DeleteDateColumn()
    deletedAt?: Date;
  }