import { In } from "typeorm";
import { Ingredient } from "../models/Ingredient";
import { OrderToProduct } from "../models/OrderToProduct";
import { Product } from "../models/Product";

export async function deleteOrderToProduct (order_id) {
    const orderToProducts = await OrderToProduct.find({
        where: {  order: order_id }
    });

    for (const orderToProduct of orderToProducts) {
        await orderToProduct.remove();
    }
} 

export async function getProAndExcludedIng (req) {
    const products = [];

    for (const order_product of req.body.products) {
        const product = await Product.findOne({
            where: {  id: order_product["id"] }
        });
        
        const ingredients = await Ingredient.find({
            where: { id: In(order_product["excluded_ingredients"]) }
        })

        products.push(
            {
                "product":  product,
                "excluded_ingredients": ingredients
            },
        );
    }

    return products;

}

export async function saveProAndExcludedIng (products, order) {

    const otp_array = []

    for (const product of products) {

        const otp = new OrderToProduct();
        otp.product = product.product;
        otp.excluded_ingredients = product.excluded_ingredients;
        otp.order = order;

        await otp.save();
        otp_array.push(otp);
    }

    return otp_array;
        
}
