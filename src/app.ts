import "reflect-metadata";
import app from "./database/connection";
import UserRouter from "./routes/users";
import MessageRouter from "./routes/messages";
require('dotenv').config()

var jwtexpress = require('express-jwt');

app.use(jwtexpress({ secret: process.env.SECRET, algorithms: ['HS256']}).unless({
    path: [
        '/auth',
        '/users'
    ]
}));

app.use(UserRouter);
app.use(MessageRouter)
app.listen(process.env.PORT);
