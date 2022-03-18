import express from 'express';
import { deleteProductToIngredient, getIngredients, saveIngredient } from '../helper/ingredientHelper';
import { File } from '../models/File';
import { Product } from '../models/Product';
import { productValidatorPost, productValidatorPut } from '../validators/productValidator';

let router = express.Router();

// create a new product
router.post('/products',
    productValidatorPost,
    async (req, res) => {
    

    const product = await Product.findOne({
        where: {
            name: req.body.name,
            price: req.body.price
        },
        relations: ["file", "pti", "pti.ingredient", "pti.ingredient.file"]

    });

    if (product === undefined) {
        const product = new Product();
        product.name = req.body.name;
        product.price = req.body.price;
        product.custom = req.body.custom;
        await product.save();

        if (req.body.ingredients) {
            let ingredients = await getIngredients(req, product)
            product.pti = ingredients;
            saveIngredient(ingredients, product);
        }

        return res.json({status : 200, data: product})
    }

    console.log(product);

    res.json({status : 409, data: {...product, message: "Product already exists"}})
    
})

//get all products
router.get('/products', async (req, res) => {
    const products = await Product.find({ where: {custom: false},relations: ["file", "pti", "pti.ingredient", "pti.ingredient.file"] });
    
    res.json({status : 200, data: products})
})

// get one product
router.get('/products/:id', async (req, res) => {
    const product = await Product.findOne({where: { id: req.params.id }, relations: ["file", "pti", "pti.ingredient", "pti.ingredient.file"] });

    if (product) {
        return res.json({status : 200, data: product})
    }

    return res.status(400).json({ error: "Product does not exist" })
})

// update a product
router.put('/products/:id', 
    productValidatorPut,
    async (req, res) => {
    const product = await Product.findOne({where: { id: req.params.id }, relations: ["pti", "pti.ingredient", "file"] });

    if (product) {
        product.name = req.body.name || product.name;
        product.price = req.body.price || product.price;

        if (req.body.image) {
            const image = await File.findOne({where: {id: req.body.image}})

            if (image != undefined) product.file = image; 
            if (image === undefined) return res.status(400).json({ error: "Image does not exist" })
        }

        await product.save();

        if (req.body.ingredients) {
            let ingredients = await getIngredients(req, product)
            product.pti = ingredients || product.pti;
            deleteProductToIngredient(req.params.id)
            saveIngredient(ingredients, product);
        }

        

        return res.json({status : 200, data: product})
    }
   
    return res.status(400).json({ error: "Product does not exist" })
    
})

// delete one product
router.delete('/products/:id', 
    
    async (req, res) => {
    const product = await Product.findOne({where: { id: req.params.id }})

    if (product) {
        await deleteProductToIngredient(req.params.id);
        await product.remove();
        return res.json({status : 200, data: "product deleted"})
    }

    return res.status(400).json({ error: "Product does not exist" })

})

export default router;  

