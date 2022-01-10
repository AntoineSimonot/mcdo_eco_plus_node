import express from 'express';
import * as sha512 from 'js-sha512'
import { User } from '../models/User';
import * as jwt from 'jsonwebtoken'
const { body, validationResult } = require('express-validator');

let router = express.Router();

router.get('/auth', 
    async (req, res) => {
    let user = await User.findOne({where: {  
        email: req.body.email,
        password: sha512.sha512(req.body.password)
    }})

    let token = jwt.sign({ id: user.id }, process.env.SECRET);

    res.json({status: 200, data: token})

})

router.get('/users/me', async (req, res) => {
    // @ts-ignore
    let user = await User.findOne({where: { id: req.user.id }})

    res.json({status : 200, data: user})
})

// create a new user
router.post('/users', 
    body('firstname').isLength({ min: 1 }).withMessage('Firstname is required'),
    body('lastname').isLength({ min: 1 }).withMessage('Lastname is required'),
    body('email').isEmail().withMessage('Email is required'),
    body('password').isLength({ min: 1 }).withMessage('Password is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('password').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/).withMessage('Password must contain at least one lowercase letter, one uppercase letter, one number and one special character'),
    async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const user = new User();
    user.firstname = req.body.firstname;
    user.lastname = req.body.lastname;
    user.email = req.body.email;
    user.password = sha512.sha512(req.body.password);
    await user.save();

    res.json({status : 200, data: user})
})


export default router;  

