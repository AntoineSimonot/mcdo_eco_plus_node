"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const Ingredient_1 = require("../models/Ingredient");
const OrderToProduct_1 = require("../models/OrderToProduct");
const Product_1 = require("../models/Product");
function deleteOrderToProduct(order_id) {
    return __awaiter(this, void 0, void 0, function* () {
        const orderToProducts = yield OrderToProduct_1.OrderToProduct.find({
            where: { order: order_id }
        });
        for (const orderToProduct of orderToProducts) {
            yield orderToProduct.remove();
        }
    });
}
exports.deleteOrderToProduct = deleteOrderToProduct;
function getProAndExcludedIng(req) {
    return __awaiter(this, void 0, void 0, function* () {
        const products = [];
        for (const order_product of req.body.products) {
            const product = yield Product_1.Product.findOne({
                where: { id: order_product["id"] }
            });
            const ingredients = yield Ingredient_1.Ingredient.find({
                where: { id: typeorm_1.In(order_product["excluded_ingredients"]) }
            });
            products.push({
                "product": product,
                "excluded_ingredients": ingredients
            });
        }
        return products;
    });
}
exports.getProAndExcludedIng = getProAndExcludedIng;
function saveProAndExcludedIng(products, order) {
    return __awaiter(this, void 0, void 0, function* () {
        const otp_array = [];
        for (const product of products) {
            const otp = new OrderToProduct_1.OrderToProduct();
            otp.product = product.product;
            otp.excluded_ingredients = product.excluded_ingredients;
            otp.order = order;
            yield otp.save();
            otp_array.push(otp);
        }
        return otp_array;
    });
}
exports.saveProAndExcludedIng = saveProAndExcludedIng;
//# sourceMappingURL=orderHelper.js.map