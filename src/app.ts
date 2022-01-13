import "reflect-metadata";
import app from "./database/connection";
import UserRouter from "./routes/users";
import MessageRouter from "./routes/messages";
import { User } from "./models/User";
import {Server} from "socket.io";
require('dotenv').config()

declare global {
    namespace Express {
      interface Request {
        user: User
        io: Server
      }
    }
}

var cors = require("cors");
app.use(cors());

const http = require('http');
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    }
});

io.on('connection', (socket) => {
    console.log('a user connected');
});


app.use(async (req, res, next) => {
    req.io = io;

    if (req.user) {
        req.user = await User.findOne({ where: {id: req.user.id}});
        next();
    }
    else {
        next();
    }
})

app.use(UserRouter)
app.use(MessageRouter)

server.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
