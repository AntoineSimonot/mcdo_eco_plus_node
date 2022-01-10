import express from 'express';
import * as sha512 from 'js-sha512'
import { User } from '../models/User';
import * as jwt from 'jsonwebtoken'
import userValidator from '../validators/userValidator';

let router = express.Router();

// create a new user
router.post('/users', 
    userValidator,
    async (req, res) => {

    const user = new User();
    user.firstname = req.body.firstname;
    user.lastname = req.body.lastname;
    user.email = req.body.email;
    user.password = sha512.sha512(req.body.password);
    await user.save();

    res.json({status : 200, data: user})
})

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

export default router;  

