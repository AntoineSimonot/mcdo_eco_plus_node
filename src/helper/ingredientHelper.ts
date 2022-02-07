import { Ingredient } from "../models/Ingredient";
import { ProductToIngredient } from "../models/ProductToIngredient";

export async function deleteProductToIngredient (product_id) {
    const productToIngredients = await ProductToIngredient.find({
        where: {
            product: product_id
        }
    });

    productToIngredients.forEach(productToIngredient => {
        productToIngredient.remove();
    });
} 

export async function getIngredients (req, product) {
    const ingredients = [];

    for (const ingredient_id of req.body.ingredients) {
        const ingredient = await Ingredient.findOne({
            where: {
                id: ingredient_id,
            }
        });
      ingredients.push(ingredient);
    }
    return ingredients;
}

export async function saveIngredient (ingredients, product) {
    ingredients.forEach(async ingredient => {
        let pti = new ProductToIngredient();
        pti.ingredient = ingredient;
        pti.product = product;
        await pti.save();
    });
}