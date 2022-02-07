import { createConnection } from "typeorm";
import { User } from "../models/User";
import express from 'express';
import * as bodyParser from 'body-parser'
import { Product } from "../models/Product";
import { Ingredient } from "../models/Ingredient";
import { Order } from "../models/Order";
import { Terminal } from "../models/Terminal";
import { OrderToProduct } from "../models/OrderToProduct";
import { ProductToIngredient } from "../models/ProductToIngredient";
import { File } from "../models/File";

const app = express();
app.use(bodyParser.json())

createConnection({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "mcdo_eco_plus",
    entities: [
      User,
      Product,
      Ingredient,
      Order,
      Terminal,
      OrderToProduct,
      ProductToIngredient,
      File
    ],
    synchronize: true,
    logging: true
})

export default app;