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
exports.CardSubscription = void 0;
const typeorm_1 = require("typeorm");
const Card_1 = require("./Card");
const Subscription_1 = require("./Subscription");
let CardSubscription = class CardSubscription {
    id;
    card;
    subscription;
};
exports.CardSubscription = CardSubscription;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], CardSubscription.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Card_1.Card, (card) => card.cardSubscriptions),
    (0, typeorm_1.JoinColumn)({ name: "card_id" }),
    __metadata("design:type", Card_1.Card)
], CardSubscription.prototype, "card", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Subscription_1.Subscription, (subscription) => subscription.cardSubscriptions),
    (0, typeorm_1.JoinColumn)({ name: "subscription_id" }),
    __metadata("design:type", Subscription_1.Subscription)
], CardSubscription.prototype, "subscription", void 0);
exports.CardSubscription = CardSubscription = __decorate([
    (0, typeorm_1.Entity)()
], CardSubscription);
