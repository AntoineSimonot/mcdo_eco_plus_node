const {body, validationResult} = require('express-validator');

export const orderValidatorPost = [
   
    body("terminal").optional().isNumeric().withMessage("terminal must be a number"),
    body("price").isNumeric().withMessage("price must be a number"),
    body("products").isArray().withMessage("products must be an array"),
    body("products.*.id").isNumeric().withMessage("productId must be a number"),
    body("products.*.excluded_ingredients").isArray().withMessage("excluded_ingredients must be an array"),

    (req, res, next) => {        
        const errors = validationResult(req);
        if (!errors.isEmpty())
          return res.status(422).json({errors: errors.array()});
        next();
      },
];

export const orderValidatorPut = [
  body("status").isIn(["kitchen", "finished"]).withMessage("status must be kitchen or finished"),

  (req, res, next) => {        
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res.status(422).json({errors: errors.array()});
      next();
    },
];

