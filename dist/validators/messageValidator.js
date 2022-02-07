"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { body, validationResult } = require('express-validator');
const messageValidator = [
    body('content').isLength({ min: 1 }).withMessage('Content is required'),
    body('content').isLength({ max: 255 }).withMessage('Content must be less than 255 characters'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(422).json({ errors: errors.array() });
        next();
    },
];
exports.default = messageValidator;
//# sourceMappingURL=messageValidator.js.map