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
exports.Animal = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
let Animal = class Animal extends typeorm_1.BaseEntity {
};
__decorate([
    type_graphql_1.Field(),
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Animal.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], Animal.prototype, "name", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    typeorm_1.Column("text", { nullable: true }),
    __metadata("design:type", String)
], Animal.prototype, "description", void 0);
__decorate([
    type_graphql_1.Field(() => [String]),
    typeorm_1.Column("text", { array: true }),
    __metadata("design:type", Array)
], Animal.prototype, "images", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], Animal.prototype, "size", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], Animal.prototype, "type", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], Animal.prototype, "gender", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Number)
], Animal.prototype, "age", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column("text"),
    __metadata("design:type", String)
], Animal.prototype, "phone", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column({ default: false, nullable: true }),
    __metadata("design:type", Boolean)
], Animal.prototype, "vaccionations", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column({ default: false, nullable: true }),
    __metadata("design:type", Boolean)
], Animal.prototype, "neutered", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column("text"),
    __metadata("design:type", String)
], Animal.prototype, "location", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], Animal.prototype, "createdDate", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.UpdateDateColumn(),
    __metadata("design:type", Date)
], Animal.prototype, "updatedDate", void 0);
Animal = __decorate([
    type_graphql_1.ObjectType(),
    typeorm_1.Entity()
], Animal);
exports.Animal = Animal;
//# sourceMappingURL=Animal.js.map