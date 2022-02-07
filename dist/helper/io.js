"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http = require('http');
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    }
});
exports.default = io;
//# sourceMappingURL=io.js.map