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
exports.Subscription = exports.FrequencyType = exports.SubscriptionStatus = void 0;
const typeorm_1 = require("typeorm");
const Card_1 = require("./Card");
const Customer_1 = require("./Customer");
const CardSubscription_1 = require("./CardSubscription");
var SubscriptionStatus;
(function (SubscriptionStatus) {
    SubscriptionStatus["PENDING"] = "pending";
    SubscriptionStatus["AUTHORIZED"] = "authorized";
    SubscriptionStatus["CANCELLED"] = "cancelled";
    SubscriptionStatus["FAILURE"] = "failure";
})(SubscriptionStatus || (exports.SubscriptionStatus = SubscriptionStatus = {}));
var FrequencyType;
(function (FrequencyType) {
    FrequencyType["DAYS"] = "days";
    FrequencyType["MONTHS"] = "months";
})(FrequencyType || (exports.FrequencyType = FrequencyType = {}));
let Subscription = class Subscription extends typeorm_1.BaseEntity {
    id;
    preapproval_plan_id;
    reason;
    external_reference;
    payer_email;
    payer_id;
    subscription_id;
    status;
    customer;
    cards;
    cardSubscriptions;
    // Setting Recurrence
    frequency;
    frequency_type;
    transaction_amount;
    currency_id;
    next_payment_date;
    payment_method_id;
    date_created;
    last_modified;
    deletedAt;
};
exports.Subscription = Subscription;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], Subscription.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Subscription.prototype, "preapproval_plan_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Subscription.prototype, "reason", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Subscription.prototype, "external_reference", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Subscription.prototype, "payer_email", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "bigint", nullable: true }),
    __metadata("design:type", Number)
], Subscription.prototype, "payer_id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        nullable: true
    }),
    __metadata("design:type", String)
], Subscription.prototype, "subscription_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "enum", enum: SubscriptionStatus, default: SubscriptionStatus.PENDING }),
    __metadata("design:type", String)
], Subscription.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Customer_1.Customer, (customer) => customer.subscriptions),
    (0, typeorm_1.JoinColumn)({ name: "customer_id" }),
    __metadata("design:type", Customer_1.Customer)
], Subscription.prototype, "customer", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => Card_1.Card, (card) => card.subscriptions),
    __metadata("design:type", Array)
], Subscription.prototype, "cards", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => CardSubscription_1.CardSubscription, (cardSubscription) => cardSubscription.subscription),
    __metadata("design:type", Array)
], Subscription.prototype, "cardSubscriptions", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int", nullable: true }),
    __metadata("design:type", Number)
], Subscription.prototype, "frequency", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "enum", enum: FrequencyType, nullable: true }),
    __metadata("design:type", String)
], Subscription.prototype, "frequency_type", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal", precision: 10, scale: 2, nullable: true }),
    __metadata("design:type", Number)
], Subscription.prototype, "transaction_amount", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Subscription.prototype, "currency_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "timestamp", nullable: true }),
    __metadata("design:type", Date)
], Subscription.prototype, "next_payment_date", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Subscription.prototype, "payment_method_id", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Subscription.prototype, "date_created", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Subscription.prototype, "last_modified", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    __metadata("design:type", Date)
], Subscription.prototype, "deletedAt", void 0);
exports.Subscription = Subscription = __decorate([
    (0, typeorm_1.Entity)()
], Subscription);
