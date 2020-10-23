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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnimalResolver = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const Animal_1 = require("../entities/Animal");
const AnimalInputs_1 = require("./AnimalInputs");
let AnimalResolver = class AnimalResolver {
    animals() {
        return __awaiter(this, void 0, void 0, function* () {
            return Animal_1.Animal.find();
        });
    }
    animal(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return Animal_1.Animal.findOne({ id });
        });
    }
    addAnimal(props) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield typeorm_1.getConnection()
                .createQueryBuilder()
                .insert()
                .into(Animal_1.Animal)
                .values(Object.assign({}, props))
                .returning("*")
                .execute();
            return result.raw[0];
        });
    }
    updateAnimal(id, props) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield typeorm_1.getConnection()
                .createQueryBuilder()
                .update(Animal_1.Animal)
                .set(Object.assign({}, props))
                .where("id=:id", { id })
                .returning("*")
                .execute();
            return result.raw[0];
        });
    }
    deleteAnimal(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield typeorm_1.getConnection()
                .createQueryBuilder()
                .delete()
                .from(Animal_1.Animal)
                .where("id = :id", { id })
                .execute();
            if (result.affected) {
                return true;
            }
            return false;
        });
    }
};
__decorate([
    type_graphql_1.Query(() => [Animal_1.Animal]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AnimalResolver.prototype, "animals", null);
__decorate([
    type_graphql_1.Query(() => Animal_1.Animal, { nullable: true }),
    __param(0, type_graphql_1.Arg("id", () => type_graphql_1.Int)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AnimalResolver.prototype, "animal", null);
__decorate([
    type_graphql_1.Mutation(() => Animal_1.Animal),
    __param(0, type_graphql_1.Arg("props")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [AnimalInputs_1.AnimalInputs]),
    __metadata("design:returntype", Promise)
], AnimalResolver.prototype, "addAnimal", null);
__decorate([
    type_graphql_1.Mutation(() => Animal_1.Animal, { nullable: true }),
    __param(0, type_graphql_1.Arg("id")),
    __param(1, type_graphql_1.Arg("props", () => AnimalInputs_1.AnimalInputs, { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, AnimalInputs_1.AnimalInputs]),
    __metadata("design:returntype", Promise)
], AnimalResolver.prototype, "updateAnimal", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean, { nullable: true }),
    __param(0, type_graphql_1.Arg("id", () => type_graphql_1.Int)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AnimalResolver.prototype, "deleteAnimal", null);
AnimalResolver = __decorate([
    type_graphql_1.Resolver(Animal_1.Animal)
], AnimalResolver);
exports.AnimalResolver = AnimalResolver;
//# sourceMappingURL=animal.js.map