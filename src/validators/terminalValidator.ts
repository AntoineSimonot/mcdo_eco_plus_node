const {body, validationResult} = require('express-validator');

export const terminalValidatorPost = [
    body('serial').isNumeric().isLength({min: 3, max: 50}).withMessage("serial must be between 3 and 50 characters"),
    
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
          return res.status(422).json({errors: errors.array()});
        next();
      },
];

export const terminalValidatorPut = [
  body('serial').optional().isNumeric().isLength({min: 3, max: 50}).withMessage("serial must be between 3 and 50 characters"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({errors: errors.array()});
    next();
  },

];
