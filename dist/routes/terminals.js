"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Terminal_1 = require("../models/Terminal");
const terminalValidator_1 = require("../validators/terminalValidator");
let router = express_1.default.Router();
// create a new terminal
router.post('/terminals', terminalValidator_1.terminalValidatorPost, (req, res) => __awaiter(this, void 0, void 0, function* () {
    const terminal = new Terminal_1.Terminal();
    terminal.serial = req.body.serial;
    yield terminal.save();
    return res.json({ status: 200, data: terminal });
}));
// get all terminals
router.get('/terminals', (req, res) => __awaiter(this, void 0, void 0, function* () {
    const terminals = yield Terminal_1.Terminal.find();
    return res.json({ status: 200, data: terminals });
}));
// get a terminal
router.get('/terminals/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
    const terminal = yield Terminal_1.Terminal.findOne({ where: { id: req.params.id } });
    if (terminal) {
        return res.json({ status: 200, data: terminal });
    }
    return res.status(400).json({ error: "Terminal does not exist" });
}));
// update a terminal
router.put('/terminals/:id', terminalValidator_1.terminalValidatorPut, (req, res) => __awaiter(this, void 0, void 0, function* () {
    const terminal = yield Terminal_1.Terminal.findOne({ where: { id: req.params.id } });
    if (terminal) {
        terminal.serial = req.body.serial;
        yield terminal.save();
        return res.json({ status: 200, data: terminal });
    }
    return res.status(400).json({ error: "Terminal does not exist" });
}));
// delete a terminal
router.delete('/terminals/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
    const terminal = yield Terminal_1.Terminal.findOne({ where: { id: req.params.id } });
    if (terminal) {
        yield terminal.remove();
        return res.json({ status: 200, data: terminal });
    }
    return res.status(400).json({ error: "Terminal does not exist" });
}));
exports.default = router;
//# sourceMappingURL=terminals.js.map