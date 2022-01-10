import express from 'express';
import { Message } from '../models/Message';
const { body, validationResult } = require('express-validator');

let router = express.Router();

router.post("/messages", 
    body('content').isLength({ min: 1 }).withMessage('Content is required'),
    body('content').isLength({ max: 255 }).withMessage('Content must be less than 255 characters'),
    async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
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