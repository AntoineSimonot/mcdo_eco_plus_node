import express from 'express';
import { File } from '../models/File';
import { Ingredient } from '../models/Ingredient';
import { IngredientValidatorPost, IngredientValidatorPut } from '../validators/ingredientValidator';

let router = express.Router();

// create a new ingredient
router.post('/ingredients',
    IngredientValidatorPost,
    async (req, res) => {

    const ingredientExist = await Ingredient.findOne({
        where: {
            name: req.body.name,
            price: req.body.price
        }
    });

    if (ingredientExist === undefined) {
        const ingredient = new Ingredient();
        ingredient.name = req.body.name;
        ingredient.price = req.body.price;
        ingredient.quantity = req.body.quantity;
        await ingredient.save();

        return res.json({status : 200, data: ingredient})
    }

    return res.json({status : 409, data: "ingredient already exists"});

})

// get all ingredients
router.get('/ingredients', async (req, res) => {
    const ingredients = await Ingredient.find({relations: ["file"]});
    return res.json({status : 200, data: ingredients})
})

// get an ingredient
router.get('/ingredients/:id', async (req, res) => {
    const ingredient = await Ingredient.findOne({where: {id: req.params.id}, relations: ["file"]});
    return res.json({status : 200, data: ingredient})
})

// update an ingredient
router.put('/ingredients/:id',
    IngredientValidatorPut,
    async (req, res) => {

    const ingredient = await Ingredient.findOne({where: {id: req.params.id}, relations: ["file"]});

    if (ingredient != null) {
        ingredient.name = req.body.name || ingredient.name;
        ingredient.price = req.body.price || ingredient.price;
        if (req.body.quantity != null) {
            ingredient.quantity = req.body.quantity
        }
        else{
            ingredient.quantity = ingredient.quantity
        }

        if (req.body.image) {
            const image = await File.findOne({where: {id: req.body.image}})

            if (image != undefined) ingredient.file = image; 
            if (image === undefined) return res.status(400).json({ error: "Image does not exist" })
        }

        await ingredient.save();

        return res.json({status : 200, data: ingredient})
    }

    return res.json({status : 404, data: "ingredient not found"});
})

// delete an ingredient
router.delete('/ingredients/:id', async (req, res) => {
    const ingredient = await Ingredient.findOne({where: {id: req.params.id}});

    if (ingredient != null) {
        await ingredient.remove();
        return res.json({status : 200, data: "ingredient deleted"})
    }   

    return res.json({status : 404, data: "ingredient not found"});
})



export default router;  

