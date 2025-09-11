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
exports.Customer = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("./User");
const Card_1 = require("./Card");
const Subscription_1 = require("./Subscription");
const Donation_1 = require("./Donation");
let Customer = class Customer extends typeorm_1.BaseEntity {
    mp_customer_id;
    email;
    first_name;
    last_name;
    user;
    cards;
    subscriptions;
    donations;
    createdAt;
    updatedAt;
    deletedAt;
};
exports.Customer = Customer;
__decorate([
    (0, typeorm_1.PrimaryColumn)("varchar"),
    __metadata("design:type", String)
], Customer.prototype, "mp_customer_id", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar"),
    __metadata("design:type", String)
], Customer.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar"),
    __metadata("design:type", String)
], Customer.prototype, "first_name", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
    }),
    __metadata("design:type", String)
], Customer.prototype, "last_name", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => User_1.User, (user) => user.customer),
    __metadata("design:type", User_1.User)
], Customer.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Card_1.Card, (card) => card.customer),
    __metadata("design:type", Array)
], Customer.prototype, "cards", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Subscription_1.Subscription, (subscriptions) => subscriptions.customer),
    (0, typeorm_1.JoinColumn)({ name: "subscription_id" }),
    __metadata("design:type", Array)
], Customer.prototype, "subscriptions", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Donation_1.Donation, (donations) => donations.customer),
    __metadata("design:type", Array)
], Customer.prototype, "donations", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Customer.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Customer.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    __metadata("design:type", Date)
], Customer.prototype, "deletedAt", void 0);
exports.Customer = Customer = __decorate([
    (0, typeorm_1.Entity)()
], Customer);
