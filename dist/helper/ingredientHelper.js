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
const Ingredient_1 = require("../models/Ingredient");
const ProductToIngredient_1 = require("../models/ProductToIngredient");
function deleteProductToIngredient(product_id) {
    return __awaiter(this, void 0, void 0, function* () {
        const productToIngredients = yield ProductToIngredient_1.ProductToIngredient.find({
            where: {
                product: product_id
            }
        });
        productToIngredients.forEach(productToIngredient => {
            productToIngredient.remove();
        });
    });
}
exports.deleteProductToIngredient = deleteProductToIngredient;
function getIngredients(req, product) {
    return __awaiter(this, void 0, void 0, function* () {
        const ingredients = [];
        for (const ingredient_id of req.body.ingredients) {
            const ingredient = yield Ingredient_1.Ingredient.findOne({
                where: {
                    id: ingredient_id,
                }
            });
            ingredients.push(ingredient);
        }
        return ingredients;
    });
}
exports.getIngredients = getIngredients;
function saveIngredient(ingredients, product) {
    return __awaiter(this, void 0, void 0, function* () {
        ingredients.forEach((ingredient) => __awaiter(this, void 0, void 0, function* () {
            let pti = new ProductToIngredient_1.ProductToIngredient();
            pti.ingredient = ingredient;
            pti.product = product;
            yield pti.save();
        }));
    });
}
exports.saveIngredient = saveIngredient;
//# sourceMappingURL=ingredientHelper.js.map