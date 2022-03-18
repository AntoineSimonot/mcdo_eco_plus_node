import express from 'express';
import { deleteOrderToProduct, getProAndExcludedIng, saveProAndExcludedIng } from '../helper/orderHelper';

import { Order } from '../models/Order';
import { Terminal } from '../models/Terminal';
import { orderValidatorPost, orderValidatorPut } from '../validators/orderValidator';

let router = express.Router();

// create a new product
router.post('/orders',
    orderValidatorPost,
    async (req, res) => {

    let terminal = null
    const order = new Order();

    order.price = req.body.price;
    order.user = req.user;
    await order.save();

    let products = await getProAndExcludedIng(req);

    await saveProAndExcludedIng(products, order);
    
    const order_data = await Order.findOne({where: { orderId: order.orderId }, relations: ["otp", "otp.product", "user", "otp.excluded_ingredients", "otp.product.pti", "otp.product.pti.ingredient"] });

    req.io.emit('ingredients', {"ingredients": order_data.otp});

    req.io.emit('order', {"order": order_data});


    return res.json({status : 200, data: order_data});

})

//get all orders
router.get('/orders', async (req, res) => {
    const orders = await Order.find({ relations: ["otp", "otp.product", "user", "otp.product.pti", "otp.excluded_ingredients", "otp.product.pti.ingredient"] });
    
    res.json({status : 200, data: orders})
})

// get an order
router.get('/orders/:id', async (req, res) => {
    const order = await Order.findOne({where: { orderId: req.params.id }, relations: ["otp", "otp.product", "otp.excluded_ingredients", "user"] });

    if (order) {
        return res.json({status : 200, data: order})
    }
        
    return res.status(400).json({ error: "Order does not exist" })
})

// change order status 
router.put('/orders/:id/status',
    orderValidatorPut,
    async (req, res) => {

    const order = await Order.findOne({where: { orderId: req.params.id }});

    if (order) {

        order.status = req.body.status;
        await order.save();

        const data = {
            id : order.orderId,
            status: order.status,
        }

        return res.json({status : 200, data: data})
    }

    return res.status(400).json({ error: "Order does not exist" })
})

// delete an order
router.delete('/orders/:id', 
    
    async (req, res) => {
    const order = await Order.findOne({where: { orderId: req.params.id }})

    if (order) {
        await deleteOrderToProduct(req.params.id)
        await order.remove();
        return res.json({status : 200, data: "Order has been remove"})
    }
 
    return res.status(400).json({ error: "Order does not exist" })

})

export default router;  

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



