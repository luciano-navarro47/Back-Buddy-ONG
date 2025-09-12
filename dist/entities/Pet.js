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
exports.Pet = exports.Status = exports.Sex = exports.Age = exports.Specie = exports.Size = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("./User");
var Size;
(function (Size) {
    Size["PEQUE\u00D1O"] = "peque\u00F1o";
    Size["MEDIANO"] = "mediano";
    Size["GRANDE"] = "grande";
})(Size || (exports.Size = Size = {}));
var Specie;
(function (Specie) {
    Specie["PERRO"] = "perro";
    Specie["GATO"] = "gato";
})(Specie || (exports.Specie = Specie = {}));
var Age;
(function (Age) {
    Age["CACHORRO"] = "cachorro";
    Age["JOVEN"] = "joven";
    Age["ADULTO"] = "adulto";
})(Age || (exports.Age = Age = {}));
var Sex;
(function (Sex) {
    Sex["MACHO"] = "macho";
    Sex["HEMBRA"] = "hembra";
})(Sex || (exports.Sex = Sex = {}));
var Status;
(function (Status) {
    Status["PERDIDO"] = "perdido";
    Status["ENCONTRADO"] = "encontrado";
    Status["ADOPTADO"] = "adoptado";
})(Status || (exports.Status = Status = {}));
let Pet = class Pet extends typeorm_1.BaseEntity {
    id;
    size;
    specie;
    age;
    img;
    detail;
    area;
    sex;
    status;
    user;
    createdAt;
    updatedAt;
};
exports.Pet = Pet;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], Pet.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: Object.values(Size),
    }),
    __metadata("design:type", String)
], Pet.prototype, "size", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: Object.values(Specie),
    }),
    __metadata("design:type", String)
], Pet.prototype, "specie", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: Object.values(Age),
    }),
    __metadata("design:type", String)
], Pet.prototype, "age", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Pet.prototype, "img", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Pet.prototype, "detail", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Pet.prototype, "area", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: Object.values(Sex),
    }),
    __metadata("design:type", String)
], Pet.prototype, "sex", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: Object.values(Status),
    }),
    __metadata("design:type", String)
], Pet.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, (user) => user.pets, { cascade: true }),
    __metadata("design:type", User_1.User)
], Pet.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Pet.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Pet.prototype, "updatedAt", void 0);
exports.Pet = Pet = __decorate([
    (0, typeorm_1.Entity)()
], Pet);
