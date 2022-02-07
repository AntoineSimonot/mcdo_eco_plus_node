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
const File_1 = require("../models/File");
const Ingredient_1 = require("../models/Ingredient");
const ingredientValidator_1 = require("../validators/ingredientValidator");
let router = express_1.default.Router();
// create a new ingredient
router.post('/ingredients', ingredientValidator_1.IngredientValidatorPost, (req, res) => __awaiter(this, void 0, void 0, function* () {
    const ingredientExist = yield Ingredient_1.Ingredient.findOne({
        where: {
            name: req.body.name,
            price: req.body.price
        }
    });
    if (ingredientExist != null) {
        const ingredient = new Ingredient_1.Ingredient();
        ingredient.name = req.body.name;
        ingredient.price = req.body.price;
        ingredient.quantity = req.body.quantity;
        yield ingredient.save();
        return res.json({ status: 200, data: ingredient });
    }
    return res.json({ status: 409, data: "ingredient already exists" });
}));
// get all ingredients
router.get('/ingredients', (req, res) => __awaiter(this, void 0, void 0, function* () {
    const ingredients = yield Ingredient_1.Ingredient.find({ relations: ["file"] });
    return res.json({ status: 200, data: ingredients });
}));
// get an ingredient
router.get('/ingredients/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
    const ingredient = yield Ingredient_1.Ingredient.findOne({ where: { id: req.params.id } });
    return res.json({ status: 200, data: ingredient });
}));
// update an ingredient
router.put('/ingredients/:id', ingredientValidator_1.IngredientValidatorPut, (req, res) => __awaiter(this, void 0, void 0, function* () {
    const ingredient = yield Ingredient_1.Ingredient.findOne({ where: { id: req.params.id } });
    if (ingredient != null) {
        ingredient.name = req.body.name;
        ingredient.price = req.body.price;
        ingredient.quantity = req.body.quantity;
        if (req.body.image) {
            const image = yield File_1.File.findOne({ where: { id: req.body.image } });
            if (image != undefined)
                ingredient.file = image;
            if (image === undefined)
                return res.status(400).json({ error: "Image does not exist" });
        }
        yield ingredient.save();
        return res.json({ status: 200, data: ingredient });
    }
    return res.json({ status: 404, data: "ingredient not found" });
}));
// delete an ingredient
router.delete('/ingredients/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
    const ingredient = yield Ingredient_1.Ingredient.findOne({ where: { id: req.params.id } });
    if (ingredient != null) {
        yield ingredient.remove();
        return res.json({ status: 200, data: "ingredient deleted" });
    }
    return res.json({ status: 404, data: "ingredient not found" });
}));
exports.default = router;
//# sourceMappingURL=ingredients.js.map