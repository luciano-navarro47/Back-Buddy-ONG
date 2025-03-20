import { Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from "typeorm";
import { Card } from "./Card";
import { Subscription } from "./Subscription";

@Entity()
export class CardSubscription {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => Card, (card) => card.cardSubscriptions)
    @JoinColumn({ name: "card_id" })
    card!: Card;

    @ManyToOne(() => Subscription, (subscription) => subscription.cardSubscriptions)
    @JoinColumn({ name: "subscription_id" })
    subscription!: Subscription;
}