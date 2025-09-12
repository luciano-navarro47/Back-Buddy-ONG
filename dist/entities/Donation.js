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
exports.Donation = exports.Status = void 0;
const typeorm_1 = require("typeorm");
const Customer_1 = require("./Customer");
var Status;
(function (Status) {
    Status["APPROVED"] = "approved";
    Status["PENDING"] = "pending";
    Status["FAILURE"] = "failure";
})(Status || (exports.Status = Status = {}));
let Donation = class Donation extends typeorm_1.BaseEntity {
    id;
    amount;
    currency_id;
    title;
    collector_id;
    client_id;
    status;
    preference_id;
    payment_id;
    customer;
    createdAt;
    updatedAt;
    deletedAt;
};
exports.Donation = Donation;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], Donation.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)("int"),
    __metadata("design:type", Number)
], Donation.prototype, "amount", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Donation.prototype, "currency_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Donation.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
        type: "bigint"
    }),
    __metadata("design:type", Number)
], Donation.prototype, "collector_id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
        type: "bigint"
    }),
    __metadata("design:type", Number)
], Donation.prototype, "client_id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: Object.values(Status),
        default: Status.PENDING
    }),
    __metadata("design:type", String)
], Donation.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
        type: "varchar"
    }),
    __metadata("design:type", String)
], Donation.prototype, "preference_id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
        type: "bigint",
    }),
    __metadata("design:type", Number)
], Donation.prototype, "payment_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Customer_1.Customer, (customer) => customer.donations),
    (0, typeorm_1.JoinColumn)({ name: "donations_id" }),
    __metadata("design:type", Customer_1.Customer)
], Donation.prototype, "customer", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Donation.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Donation.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    __metadata("design:type", Date)
], Donation.prototype, "deletedAt", void 0);
exports.Donation = Donation = __decorate([
    (0, typeorm_1.Entity)()
], Donation);
