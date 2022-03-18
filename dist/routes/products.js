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
const ingredientHelper_1 = require("../helper/ingredientHelper");
const File_1 = require("../models/File");
const Product_1 = require("../models/Product");
const productValidator_1 = require("../validators/productValidator");
let router = express_1.default.Router();
// create a new product
router.post('/products', productValidator_1.productValidatorPost, (req, res) => __awaiter(this, void 0, void 0, function* () {
    const product = yield Product_1.Product.findOne({
        where: {
            name: req.body.name,
            price: req.body.price
        },
        relations: ["file", "pti", "pti.ingredient", "pti.ingredient.file"]
    });
    if (product === undefined) {
        const product = new Product_1.Product();
        product.name = req.body.name;
        product.price = req.body.price;
        product.custom = req.body.custom;
        yield product.save();
        if (req.body.ingredients) {
            let ingredients = yield ingredientHelper_1.getIngredients(req, product);
            product.pti = ingredients;
            ingredientHelper_1.saveIngredient(ingredients, product);
        }
        return res.json({ status: 200, data: product });
    }
    res.json({ status: 409, data: Object.assign({}, product, { message: "Product already exists" }) });
}));
//get all products
router.get('/products', (req, res) => __awaiter(this, void 0, void 0, function* () {
    const products = yield Product_1.Product.find({ where: { custom: false }, relations: ["file", "pti", "pti.ingredient", "pti.ingredient.file"] });
    res.json({ status: 200, data: products });
}));
// get one product
router.get('/products/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
    const product = yield Product_1.Product.findOne({ where: { id: req.params.id }, relations: ["pti", "pti.ingredient"] });
    if (product) {
        return res.json({ status: 200, data: product });
    }
    return res.status(400).json({ error: "Product does not exist" });
}));
// update a product
router.put('/products/:id', productValidator_1.productValidatorPut, (req, res) => __awaiter(this, void 0, void 0, function* () {
    const product = yield Product_1.Product.findOne({ where: { id: req.params.id }, relations: ["pti", "pti.ingredient", "file"] });
    if (product) {
        product.name = req.body.name;
        product.price = req.body.price;
        if (req.body.image) {
            const image = yield File_1.File.findOne({ where: { id: req.body.image } });
            if (image != undefined)
                product.file = image;
            if (image === undefined)
                return res.status(400).json({ error: "Image does not exist" });
        }
        yield product.save();
        if (req.body.ingredients) {
            let ingredients = yield ingredientHelper_1.getIngredients(req, product);
            product.pti = ingredients;
            ingredientHelper_1.deleteProductToIngredient(req.params.id);
            ingredientHelper_1.saveIngredient(ingredients, product);
        }
        return res.json({ status: 200, data: product });
    }
    return res.status(400).json({ error: "Product does not exist" });
}));
// delete one product
router.delete('/products/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
    const product = yield Product_1.Product.findOne({ where: { id: req.params.id } });
    if (product) {
        yield ingredientHelper_1.deleteProductToIngredient(req.params.id);
        yield product.remove();
        return res.json({ status: 200, data: "product deleted" });
    }
    return res.status(400).json({ error: "Product does not exist" });
}));
exports.default = router;
//# sourceMappingURL=products.js.map