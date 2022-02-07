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
const OrderToProduct_1 = require("./OrderToProduct");
const User_1 = require("./User");
var OrderStatus;
(function (OrderStatus) {
    OrderStatus["KITCHEN"] = "kitchen";
    OrderStatus["FINISHED"] = "finished";
})(OrderStatus = exports.OrderStatus || (exports.OrderStatus = {}));
let Order = class Order extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Order.prototype, "orderId", void 0);
__decorate([
    typeorm_1.Column({
        type: "enum",
        enum: OrderStatus,
        default: OrderStatus.KITCHEN
    }),
    __metadata("design:type", String)
], Order.prototype, "status", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Order.prototype, "price", void 0);
__decorate([
    typeorm_1.ManyToOne(() => User_1.User, user => user.orders),
    __metadata("design:type", User_1.User)
], Order.prototype, "user", void 0);
__decorate([
    typeorm_1.ManyToOne(() => File_1.File, file => file.product),
    __metadata("design:type", File_1.File)
], Order.prototype, "file", void 0);
__decorate([
    typeorm_1.OneToMany(() => OrderToProduct_1.OrderToProduct, otp => otp.order, {}),
    __metadata("design:type", Array)
], Order.prototype, "otp", void 0);
Order = __decorate([
    typeorm_1.Entity()
], Order);
exports.Order = Order;
//# sourceMappingURL=Order.js.map