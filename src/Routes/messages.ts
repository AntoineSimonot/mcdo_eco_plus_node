import express from 'express';
import * as sha512 from 'js-sha512'
import * as jwt from 'jsonwebtoken'
import { Message } from '../Models/Message';

let router = express.Router();

router.post("/messages", async (req, res) => {
    const message = new Message();
    message.content = req.body.content;
    // @ts-ignore
    message.user = await User.findOne({where: { id: req.user.id }});
    await message.save();
  
    res.json({status: 200, data: message});
  });
  
//get one message
router.get("/messages/:id", async (req, res) => {
    const message = await Message.findOne(req.params.id, {relations: ["user"]});
    res.json({status: 200, data: message});
});

// get all message
router.get("/messages", async (req, res) => {
    const messages = await Message.find({relations: ["user"]});
    res.json({status: 200, data: messages});
});

export default router;