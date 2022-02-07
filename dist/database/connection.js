"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const User_1 = require("../models/User");
const express_1 = __importDefault(require("express"));
const bodyParser = __importStar(require("body-parser"));
const Product_1 = require("../models/Product");
const Ingredient_1 = require("../models/Ingredient");
const Order_1 = require("../models/Order");
const Terminal_1 = require("../models/Terminal");
const OrderToProduct_1 = require("../models/OrderToProduct");
const ProductToIngredient_1 = require("../models/ProductToIngredient");
const File_1 = require("../models/File");
const app = express_1.default();
app.use(bodyParser.json());
typeorm_1.createConnection({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "mcdo_eco_plus",
    entities: [
        User_1.User,
        Product_1.Product,
        Ingredient_1.Ingredient,
        Order_1.Order,
        Terminal_1.Terminal,
        OrderToProduct_1.OrderToProduct,
        ProductToIngredient_1.ProductToIngredient,
        File_1.File
    ],
    synchronize: true,
    logging: true
});
exports.default = app;
//# sourceMappingURL=connection.js.map