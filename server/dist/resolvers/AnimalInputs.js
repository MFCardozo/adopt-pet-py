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
exports.AnimalInputs = void 0;
const type_graphql_1 = require("type-graphql");
let AnimalInputs = class AnimalInputs {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], AnimalInputs.prototype, "name", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], AnimalInputs.prototype, "description", void 0);
__decorate([
    type_graphql_1.Field(() => [String]),
    __metadata("design:type", Array)
], AnimalInputs.prototype, "images", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], AnimalInputs.prototype, "size", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], AnimalInputs.prototype, "type", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], AnimalInputs.prototype, "gender", void 0);
__decorate([
    type_graphql_1.Field(() => type_graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], AnimalInputs.prototype, "age", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], AnimalInputs.prototype, "phone", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", Boolean)
], AnimalInputs.prototype, "vaccionations", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", Boolean)
], AnimalInputs.prototype, "neutered", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], AnimalInputs.prototype, "location", void 0);
AnimalInputs = __decorate([
    type_graphql_1.InputType()
], AnimalInputs);
exports.AnimalInputs = AnimalInputs;
//# sourceMappingURL=AnimalInputs.js.map