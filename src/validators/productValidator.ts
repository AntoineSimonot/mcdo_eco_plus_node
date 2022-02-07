const {body, validationResult} = require('express-validator');

export const productValidatorPost = [
    body("name").isString().isLength({min: 3, max: 50}).withMessage("name must be between 3 and 50 characters"),
    body("price").isNumeric().withMessage("price must be a number"),
    body("ingredients").isArray().withMessage("ingredients must be an array"),
    
  
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
          return res.status(422).json({errors: errors.array()});
        next();
      },
];

export const productValidatorPut = [
  body("name").optional().isString().isLength({min: 3, max: 50}).withMessage("name must be between 3 and 50 characters"),
  body("price").optional().isNumeric().withMessage("price must be a number"),
  body("ingredients").optional().isArray().withMessage("ingredients must be an array"),
  

  (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res.status(422).json({errors: errors.array()});
      next();
    },
]