import "reflect-metadata";
import app from "./Database/connection";
import UserRouter from "./Routes/users";
import MessageRouter from "./Routes/messages";
var jwtexpress = require('express-jwt');

app.use(jwtexpress({ secret: 'ThisIsMySecretSentenceBlaBlaBla', algorithms: ['HS256']}).unless({
    path: [
        '/auth'
    ]
}));

app.use(UserRouter);
app.use(MessageRouter)

