import app from './database/connection';
import { User } from './models/User';
import UserRouter from "./routes/Users";
import ProductRouter from "./routes/products";
import IngredientRouter from "./routes/ingredients";
import OrderRouter from "./routes/orders";
import FileRouter from "./routes/files";
import {Server} from "socket.io";

import TerminalRouter from "./routes/terminals";
require('dotenv').config()

const bodyParser = require('body-parser');
const jwtexpress = require('express-jwt');
const cors = require("cors");
const fileUpload = require('express-fileupload');

declare global {
    namespace Express {
      interface Request {
        user: User
        files: File
        io: Server

      }
    }
}

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(fileUpload({
    createParentPath: true
}));

const http = require('http');
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    }
});

io.on('connection', (socket) => {
});



app.use(jwtexpress({ secret: process.env.SECRET, algorithms: ['HS256']}).unless({
    path: [
        '/users/auth',
        '/terminals/auth',
        '/terminals',
        { url: "/products", methods: ['GET', 'POST'] },
        { url: "/ingredients", methods: ['GET'] },
        { url: /^\/ingredients\/.*/, methods: ['GET', 'PUT'] },
        { url: "/users", methods: ['POST'] },
        { url: "/orders", methods: ['GET', 'PUT', 'POST'] },
        { url: /^\/orders\/.*/, methods: ['GET'] }
    ]
}));

app.use(async (req, res, next) => {
    req.io = io;

    if (req.user) {
        req.user = await User.findOne({ where: {id: req.user.id}, relations: ["terminal"] });
        next();
    }
    else {
        next();
    }
})

app.put('/orders/:id/status', function (req, res, next) {
    io.emit('change-order-status', req.params.id);
    next();
  });

app.use(UserRouter);
app.use(ProductRouter);
app.use(IngredientRouter);
app.use(OrderRouter);
app.use(TerminalRouter);
app.use(FileRouter);

server.listen(process.env.PORT, () => {
});