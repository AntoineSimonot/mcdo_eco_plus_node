"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const orderHelper_1 = require("../helper/orderHelper");
const Order_1 = require("../models/Order");
const orderValidator_1 = require("../validators/orderValidator");
let router = express_1.default.Router();
// create a new product
router.post('/orders', orderValidator_1.orderValidatorPost, (req, res) => __awaiter(this, void 0, void 0, function* () {
    let terminal = null;
    const order = new Order_1.Order();
    order.price = req.body.price;
    order.user = req.user;
    yield order.save();
    let products = yield orderHelper_1.getProAndExcludedIng(req);
    yield orderHelper_1.saveProAndExcludedIng(products, order);
    const order_data = yield Order_1.Order.findOne({ where: { orderId: order.orderId }, relations: ["otp", "otp.product", "user", "otp.product.pti", "otp.product.pti.ingredient"] });
    req.io.emit('ingredients', { "ingredients": order_data.otp });
    req.io.emit('order', { "order": order_data });
    return res.json({ status: 200, data: order_data });
}));
//get all orders
router.get('/orders', (req, res) => __awaiter(this, void 0, void 0, function* () {
    const orders = yield Order_1.Order.find({ relations: ["otp", "otp.product", "user", "otp.product.pti", "otp.product.pti.ingredient"] });
    res.json({ status: 200, data: orders });
}));
// get an order
router.get('/orders/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
    const order = yield Order_1.Order.findOne({ where: { orderId: req.params.id }, relations: ["otp", "otp.product", "otp.excluded_ingredients", "user"] });
    if (order) {
        return res.json({ status: 200, data: order });
    }
    return res.status(400).json({ error: "Order does not exist" });
}));
// change order status 
router.put('/orders/:id/status', orderValidator_1.orderValidatorPut, (req, res) => __awaiter(this, void 0, void 0, function* () {
    const order = yield Order_1.Order.findOne({ where: { orderId: req.params.id } });
    if (order) {
        order.status = req.body.status;
        yield order.save();
        const data = {
            id: order.orderId,
            status: order.status,
        };
        return res.json({ status: 200, data: data });
    }
    return res.status(400).json({ error: "Order does not exist" });
}));
// delete an order
router.delete('/orders/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
    const order = yield Order_1.Order.findOne({ where: { orderId: req.params.id } });
    if (order) {
        yield orderHelper_1.deleteOrderToProduct(req.params.id);
        yield order.remove();
        return res.json({ status: 200, data: "Order has been remove" });
    }
    return res.status(400).json({ error: "Order does not exist" });
}));
exports.default = router;
// update an order
// router.put('/orders/:id',
//     orderValidatorPut,
//     async (req, res) => {
//     const order = await Order.findOne({where: { orderId: req.params.id }, relations: ["otp", "otp.product", "otp.excluded_ingredients", "user"] });
//     if (order) {
//         order.status = req.body.status;
//         order.price = req.body.price;
//         await order.save();
//         let data = {
//             id : order.orderId,
//             status: order.status,
//             price: order.price,
//             user: order.user,
//             terminal: order.terminal,
//             products : []
//         }
//        data.products = order.otp.map(otp => {
//             return {
//                 id: otp.product.id,
//                 name : otp.product.name,
//                 price : otp.product.price,
//                 excluded_ingredients : otp.excluded_ingredients
//             };
//         });
//         if (req.body.products) {
//             let products = await getProAndExcludedIng(req);
//             data.products = products.map(product => {
//                 return {
//                     id: product.product.id,
//                     name : product.product.name,
//                     price : product.product.price,
//                     excluded_ingredients : product.excluded_ingredients
//                 };
//             });
//             deleteOrderToProduct(req.params.id)
//             await saveProAndExcludedIng(products, order);
//         }
//         return res.json({status : 200, data: data})
//     }
//     if (order === undefined) {
//         return res.status(400).json({ error: "Order does not exist" })
//     }
// })
//# sourceMappingURL=orders.js.map