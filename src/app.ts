import app from './database/connection';
import { User } from './models/User';
import UserRouter from "./routes/Users";
import ProductRouter from "./routes/products";
import IngredientRouter from "./routes/ingredients";
import OrderRouter from "./routes/orders";
import FileRouter from "./routes/files";

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
      }
    }
}

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(fileUpload({
    createParentPath: true
}));

app.use(jwtexpress({ secret: process.env.SECRET, algorithms: ['HS256']}).unless({
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

app.use(async (req, res, next) => {
    if (req.user) {
        req.user = await User.findOne({ where: {id: req.user.id}, relations: ["terminal"] });
        next();
    }
    else {
        next();
    }
})

app.use(UserRouter);
app.use(ProductRouter);
app.use(IngredientRouter);
app.use(OrderRouter);
app.use(TerminalRouter);
app.use(FileRouter);

app.listen(process.env.PORT)