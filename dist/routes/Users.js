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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const sha512 = __importStar(require("js-sha512"));
const User_1 = require("../models/User");
const jwt = __importStar(require("jsonwebtoken"));
const userValidator_1 = __importDefault(require("../validators/userValidator"));
const Terminal_1 = require("../models/Terminal");
let router = express_1.default.Router();
// create a new user
router.post('/users', userValidator_1.default, (req, res) => __awaiter(this, void 0, void 0, function* () {
    const userExists = yield User_1.User.findOne({
        where: {
            email: req.body.email
        }
    });
    if (userExists) {
        res.json({ status: 409, data: "user already exists" });
    }
    else {
        const user = new User_1.User();
        user.firstname = req.body.firstname;
        user.lastname = req.body.lastname;
        user.email = req.body.email;
        user.password = sha512.sha512(req.body.password);
        yield user.save();
        res.json({ status: 200, data: user });
    }
}));
router.post('/users/auth', (req, res) => __awaiter(this, void 0, void 0, function* () {
    if (req.body.serial) {
        let terminal = yield Terminal_1.Terminal.findOne({
            where: {
                serial: req.body.serial
            }
        });
        if (terminal) {
            let user = yield User_1.User.findOne({
                where: {
                    terminal: terminal.id
                }
            });
            if (user) {
                let token = jwt.sign({
                    id: user.id,
                }, process.env.SECRET);
                res.json({ status: 200, data: token });
            }
            ;
        }
        else {
            return res.json({ status: 400, data: "terminal does not exist" });
        }
    }
    else {
        let user = yield User_1.User.findOne({
            where: {
                email: req.body.email,
                password: sha512.sha512(req.body.password)
            }
        });
        if (user) {
            let token = jwt.sign({
                id: user.id,
            }, process.env.SECRET);
            res.json({ status: 200, data: token });
        }
        else {
            return res.json({ status: 400, data: "user does not exist" });
        }
    }
}));
router.get('/users/me', (req, res) => __awaiter(this, void 0, void 0, function* () {
    let user = yield User_1.User.findOne({ where: { id: req.user.id } });
    res.json({ status: 200, data: user });
}));
// get one user
router.get('/users/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
    const user = yield User_1.User.findOne({ where: { id: req.params.id } });
    res.json({ status: 200, data: user });
}));
exports.default = router;
//# sourceMappingURL=Users.js.map