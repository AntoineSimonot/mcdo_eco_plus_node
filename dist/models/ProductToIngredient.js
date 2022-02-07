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
const Ingredient_1 = require("./Ingredient");
const Product_1 = require("./Product");
let ProductToIngredient = class ProductToIngredient extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], ProductToIngredient.prototype, "productToIngredientId", void 0);
__decorate([
    typeorm_1.ManyToOne(() => Product_1.Product, product => product.pti, {}),
    __metadata("design:type", Product_1.Product)
], ProductToIngredient.prototype, "product", void 0);
__decorate([
    typeorm_1.ManyToOne(() => Ingredient_1.Ingredient, ingredient => ingredient.pti, { cascade: true, onDelete: 'CASCADE' }),
    __metadata("design:type", Ingredient_1.Ingredient)
], ProductToIngredient.prototype, "ingredient", void 0);
ProductToIngredient = __decorate([
    typeorm_1.Entity()
], ProductToIngredient);
exports.ProductToIngredient = ProductToIngredient;
//# sourceMappingURL=ProductToIngredient.js.map