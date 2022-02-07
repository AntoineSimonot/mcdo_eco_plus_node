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
const Message_1 = require("../models/Message");
const messageValidator_1 = __importDefault(require("../validators/messageValidator"));
let router = express_1.default.Router();
router.post("/messages", messageValidator_1.default, (req, res) => __awaiter(this, void 0, void 0, function* () {
    const message = new Message_1.Message();
    message.content = req.body.content;
    message.user = req.user;
    yield message.save();
    req.io.emit('message', { "message": message.content });
    res.json({ status: 200, data: message });
}));
//get one message
router.get("/messages/:id", (req, res) => __awaiter(this, void 0, void 0, function* () {
    const message = yield Message_1.Message.findOne(req.params.id, { relations: ["user"] });
    res.json({ status: 200, data: message });
}));
// get all message
router.get("/messages", (req, res) => __awaiter(this, void 0, void 0, function* () {
    const messages = yield Message_1.Message.find({ relations: ["user"] });
    res.json({ status: 200, data: messages });
}));
exports.default = router;
//# sourceMappingURL=messages.js.map