const express = require('express')
const http = require("http");
const socketIo = require("socket.io");

const cors = require('cors')
const bodyParser = require('body-parser');

const port = 8080;
const index = require("./routes/crawlerRoutes")//handle the query that comes from the client

const main = async () => {
    
    const app = express()
    app.use(index);
    
    app.use(cors());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    const server = http.createServer(app);

    const io = socketIo(server);

    let interval;

    io.on("connection", (socket) => {
        console.log("New client connected");
        if (interval) {
            clearInterval(interval);
        }
        interval = setInterval(() => getApiAndEmit(socket), 1000);
        socket.on("sbmitCrawlerParameters", (event) => {
        console.log("url: "+event.url+" maxDepth: "+event.maxDepth+" maxPages: "+event.maxPages);
        });
        socket.on("disconnect", () => {
            console.log("Client disconnected");
            clearInterval(interval);
        });
    });
    // (req.body.URL, req.body.maxDepth, req.body.maxPages)

    const getApiAndEmit = socket => {
        const response = new Date();
        // Emitting a new message. Will be consumed by the client
        socket.emit("FromAPI", response);
      };
      
    server.listen(port, () => console.log(`Listening on port ${port}`));
}

main();