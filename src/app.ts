import "reflect-metadata";
import app from "./Database/connection";
import UserRouter from "./Routes/users";
import MessageRouter from "./Routes/messages";
require('dotenv').config()

var jwtexpress = require('express-jwt');

app.use(jwtexpress({ secret: process.env.SECRET, algorithms: ['HS256']}).unless({
    path: [
        '/auth'
    ]
}));

app.use(UserRouter);
app.use(MessageRouter)
app.listen( process.env.PORT);
