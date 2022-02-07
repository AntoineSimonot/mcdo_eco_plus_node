import express from 'express';
import { Terminal } from '../models/Terminal';
import { terminalValidatorPost, terminalValidatorPut } from '../validators/terminalValidator';

let router = express.Router();

// create a new terminal
router.post('/terminals',
    terminalValidatorPost,
    async (req, res) => {

    const terminal = new Terminal();
    terminal.serial = req.body.serial;

    await terminal.save();

    return res.json({status : 200, data: terminal})
})

// get all terminals
router.get('/terminals', async (req, res) => {
    const terminals = await Terminal.find();

    return res.json({status : 200, data: terminals})
})

// get a terminal
router.get('/terminals/:id', async (req, res) => {
    const terminal = await Terminal.findOne({where: { id: req.params.id }});

    if (terminal) {
        return res.json({status : 200, data: terminal})
    }

    return res.status(400).json({ error: "Terminal does not exist" })
})


// update a terminal
router.put('/terminals/:id',
    terminalValidatorPut,
    async (req, res) => {
    const terminal = await Terminal.findOne({where: { id: req.params.id }});

    if (terminal) {
        terminal.serial = req.body.serial;
        await terminal.save();

        return res.json({status : 200, data: terminal})
    }

    return res.status(400).json({ error: "Terminal does not exist" })
})

// delete a terminal
router.delete('/terminals/:id', async (req, res) => {
    const terminal = await Terminal.findOne({where: { id: req.params.id }});

    if (terminal) {
        await terminal.remove();

        return res.json({status : 200, data: terminal})
    }

    return res.status(400).json({ error: "Terminal does not exist" })
})



export default router;  

