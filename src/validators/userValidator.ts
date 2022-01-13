const {body, validationResult} = require('express-validator');

const userValidator = [
    body('firstname').isLength({ min: 1 }).withMessage('Firstname is required'),
    body('lastname').isLength({ min: 1 }).withMessage('Lastname is required'),
    body('email').isEmail().withMessage('Email is required'),
    body('password').isLength({ min: 1 }).withMessage('Password is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('password').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/).withMessage('Password must contain at least one lowercase letter, one uppercase letter, one number and one special character'),
    
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
          return res.status(422).json({errors: errors.array()});
        next();
      },
];

export default userValidator;