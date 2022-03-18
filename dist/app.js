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
const connection_1 = __importDefault(require("./database/connection"));
const User_1 = require("./models/User");
const Users_1 = __importDefault(require("./routes/Users"));
const products_1 = __importDefault(require("./routes/products"));
const ingredients_1 = __importDefault(require("./routes/ingredients"));
const orders_1 = __importDefault(require("./routes/orders"));
const files_1 = __importDefault(require("./routes/files"));
const socket_io_1 = require("socket.io");
const terminals_1 = __importDefault(require("./routes/terminals"));
require('dotenv').config();
const bodyParser = require('body-parser');
const jwtexpress = require('express-jwt');
const cors = require("cors");
const fileUpload = require('express-fileupload');
connection_1.default.use(cors());
connection_1.default.use(bodyParser.json());
connection_1.default.use(bodyParser.urlencoded({ extended: true }));
connection_1.default.use(fileUpload({
    createParentPath: true
}));
const http = require('http');
const server = http.createServer(connection_1.default);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "*",
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    }
});
io.on('connection', (socket) => {
});
connection_1.default.use(jwtexpress({ secret: process.env.SECRET, algorithms: ['HS256'] }).unless({
    path: [
        '/users/auth',
        '/terminals/auth',
        '/terminals',
        { url: "/products", methods: ['GET'] },
        { url: "/users", methods: ['POST'] },
        { url: "/orders", methods: ['GET'] },
        { url: /^\/orders\/.*/, methods: ['GET'] }
    ]
}));
connection_1.default.use((req, res, next) => __awaiter(this, void 0, void 0, function* () {
    req.io = io;
    if (req.user) {
        req.user = yield User_1.User.findOne({ where: { id: req.user.id }, relations: ["terminal"] });
        next();
    }
    else {
        next();
    }
}));
connection_1.default.put('/orders/:id/status', function (req, res, next) {
    io.emit('change-order-status', req.params.id);
    next();
});
connection_1.default.use(Users_1.default);
connection_1.default.use(products_1.default);
connection_1.default.use(ingredients_1.default);
connection_1.default.use(orders_1.default);
connection_1.default.use(terminals_1.default);
connection_1.default.use(files_1.default);
server.listen(process.env.PORT, () => {
});
//# sourceMappingURL=app.js.map