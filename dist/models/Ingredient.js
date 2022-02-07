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
const typeorm_1 = require("typeorm");
const File_1 = require("./File");
const ProductToIngredient_1 = require("./ProductToIngredient");
let Ingredient = class Ingredient extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Ingredient.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Ingredient.prototype, "name", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Ingredient.prototype, "price", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Ingredient.prototype, "quantity", void 0);
__decorate([
    typeorm_1.OneToMany(() => ProductToIngredient_1.ProductToIngredient, pti => pti.ingredient, {}),
    __metadata("design:type", Array)
], Ingredient.prototype, "pti", void 0);
__decorate([
    typeorm_1.ManyToOne(() => File_1.File, file => file.ingredient),
    __metadata("design:type", File_1.File)
], Ingredient.prototype, "file", void 0);
Ingredient = __decorate([
    typeorm_1.Entity()
], Ingredient);
exports.Ingredient = Ingredient;
//# sourceMappingURL=Ingredient.js.map