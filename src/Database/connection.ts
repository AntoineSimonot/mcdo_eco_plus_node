import { createConnection, getConnection } from "typeorm";
import { Message } from "../Models/Message";
import { User } from "../Models/User";
import express from 'express';
import * as bodyParser from 'body-parser'

const app = express();
const port = 3009;
app.use(bodyParser.json())

createConnection({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "typescript",
    entities: [
      User,
      Message
    ],
    synchronize: true,
    logging: true
})

app.listen(port);

export default app;