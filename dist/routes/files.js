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
const File_1 = require("../models/File");
const S3_1 = __importDefault(require("../S3"));
let router = express_1.default.Router();
router.post('/files', (req, res) => __awaiter(this, void 0, void 0, function* () {
    if (req.files) {
        // @ts-ignore
        let avatar = req.files.avatar;
        S3_1.default(avatar);
        return res.json({
            status: 200,
            message: 'File is uploaded',
        });
    }
    return res.json({
        status: 400,
        message: 'No file uploaded'
    });
}));
//get one file
router.get('/files/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
    const image = yield File_1.File.findOne({ where: { id: req.params.id } });
    if (image) {
        return res.json({
            status: 200,
            data: image
        });
    }
    return res.json({
        status: 400,
        message: 'No file found'
    });
}));
exports.default = router;
//# sourceMappingURL=files.js.map