import express from 'express';
import * as sha512 from 'js-sha512'
import { User } from '../models/User';
import * as jwt from 'jsonwebtoken'
import userValidator from '../validators/userValidator';
import { Terminal } from '../models/Terminal';

let router = express.Router();

// create a new user
router.post('/users', 
    userValidator,
    async (req, res) => {

    const userExists = await User.findOne({
        where: {
            email: req.body.email
        }
    });

    if (userExists) {
        res.json({status : 409, data: "user already exists"});
    }

    else {
        const user = new User();
        user.firstname = req.body.firstname;
        user.lastname = req.body.lastname;
        user.email = req.body.email;
        user.password = sha512.sha512(req.body.password);

        await user.save();

        res.json({status : 200, data: user})
    }
})

router.post('/users/auth', 
    async (req, res) => {
    if (req.body.serial) {
        let terminal = await Terminal.findOne({
            where: {
                serial: req.body.serial
            }
        });

        if (terminal) {
            let user = await User.findOne({
                where: {
                    terminal: terminal.id
                }
            });

            if (user) {
                let token = jwt.sign({
                    id: user.id,
                }, process.env.SECRET);

                res.json({status : 200, data: token});

            };
        }
        else {
            return res.json({status : 400, data: "terminal does not exist"});
        }
    }

    else {
        let user = await User.findOne({
            where: {
                email: req.body.email,
                password: sha512.sha512(req.body.password)
            }
        });

        if (user) {
            let token = jwt.sign({
                id: user.id,
            }, process.env.SECRET);

            res.json({status : 200, data: token});

        }
        else {
            return res.json({status : 400, data: "user does not exist"});
        }
    }

})

router.get('/users/me', async (req, res) => {
    let user = await User.findOne({where: { id: req.user.id }})

    res.json({status : 200, data: user})
})

// get one user
router.get('/users/:id', async (req, res) => {
    const user = await User.findOne({where: { id: req.params.id }})
    res.json({status : 200, data: user})
})

export default router;  

