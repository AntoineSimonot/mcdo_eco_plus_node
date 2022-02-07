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
const Order_1 = require("./Order");
const Product_1 = require("./Product");
let OrderToProduct = class OrderToProduct extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], OrderToProduct.prototype, "orderToProductId", void 0);
__decorate([
    typeorm_1.ManyToOne(() => Order_1.Order, order => order.otp, {}),
    __metadata("design:type", Order_1.Order)
], OrderToProduct.prototype, "order", void 0);
__decorate([
    typeorm_1.ManyToOne(() => Product_1.Product, product => product.otp),
    __metadata("design:type", Product_1.Product)
], OrderToProduct.prototype, "product", void 0);
__decorate([
    typeorm_1.ManyToMany(type => Ingredient_1.Ingredient, ingredient => ingredient.pti, {
        cascade: true,
    }),
    typeorm_1.JoinTable({ name: 'excluded_ingredient' }),
    __metadata("design:type", Array)
], OrderToProduct.prototype, "excluded_ingredients", void 0);
OrderToProduct = __decorate([
    typeorm_1.Entity()
], OrderToProduct);
exports.OrderToProduct = OrderToProduct;
//# sourceMappingURL=OrderToProduct.js.map