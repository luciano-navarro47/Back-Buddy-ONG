"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Card = void 0;
const typeorm_1 = require("typeorm");
const Subscription_1 = require("./Subscription");
const Customer_1 = require("./Customer");
const CardSubscription_1 = require("./CardSubscription");
let Card = class Card extends typeorm_1.BaseEntity {
    id;
    expiration_month;
    expiration_year;
    last_four_digit;
    customer;
    subscriptions;
    cardSubscriptions;
    createdAt;
    updatedAt;
    deletedAt;
};
exports.Card = Card;
__decorate([
    (0, typeorm_1.PrimaryColumn)({ type: "varchar" }),
    __metadata("design:type", String)
], Card.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int" }),
    __metadata("design:type", Number)
], Card.prototype, "expiration_month", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int" }),
    __metadata("design:type", Number)
], Card.prototype, "expiration_year", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 4 }),
    __metadata("design:type", String)
], Card.prototype, "last_four_digit", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Customer_1.Customer, (customer) => customer.cards),
    (0, typeorm_1.JoinColumn)({ name: "customer_id" }),
    __metadata("design:type", Customer_1.Customer)
], Card.prototype, "customer", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => Subscription_1.Subscription, (subscription) => subscription.cards),
    (0, typeorm_1.JoinColumn)({ name: "card_subscription" }),
    __metadata("design:type", Array)
], Card.prototype, "subscriptions", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => CardSubscription_1.CardSubscription, (cardSubscription) => cardSubscription.card),
    __metadata("design:type", Array)
], Card.prototype, "cardSubscriptions", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Card.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Card.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    __metadata("design:type", Date)
], Card.prototype, "deletedAt", void 0);
exports.Card = Card = __decorate([
    (0, typeorm_1.Entity)()
], Card);
