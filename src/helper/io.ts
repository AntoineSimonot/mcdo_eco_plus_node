const http = require('http');
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    }
});

export default io;