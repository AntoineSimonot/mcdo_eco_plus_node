const {body, validationResult} = require('express-validator');

export const IngredientValidatorPost = [
    body("name").isString().isLength({min: 3, max: 50}).withMessage("name must be between 3 and 50 characters"),
    body("price").isNumeric().withMessage("price must be a number"),
    body("quantity").isNumeric().withMessage("quantity must be a number"),
    
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
          return res.status(422).json({errors: errors.array()});
        next();
      },
];

export const IngredientValidatorPut = [
    body("name").optional().isString().isLength({min: 3, max: 50}).withMessage("name must be between 3 and 50 characters"),
    body("price").optional().isNumeric().withMessage("price must be a number"),
    body("quantity").optional().isNumeric().withMessage("quantity must be a number"),

    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res.status(422).json({errors: errors.array()});
      next();
    },
];

