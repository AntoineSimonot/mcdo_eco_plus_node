import { createConnection, getConnection } from "typeorm";
import { Message } from "../models/Message";
import { User } from "../models/User";
import express from 'express';
import * as bodyParser from 'body-parser'

const app = express();
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

export default app;