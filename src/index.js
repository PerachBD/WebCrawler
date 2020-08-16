const http = require("http");
const express = require('express');
const bodyParser = require('body-parser');
const socketIo = require("socket.io");
const cors = require('cors');
const {WorkersManager} = require('./WorkersManager');
const index = require("./routes/crawlerRoutes")//handle the query that comes from the client
const port = 8080;
const app = express()
app.use(index);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const server = http.createServer(app);
const io = socketIo(server);
const workersManager = new WorkersManager(2);
let interval;

io.on("connection", (socket) => {
    console.log("New client connected");
    if (interval) {
        clearInterval(interval);
    }
    socket.on("FromClient", async (event) => {
        if(!event.command){
            throw new Error('not command in the request')
        }
        console.log('Server got command: ', event.command);
        switch (event.command) {
            case 'NewScanJob':
                workersManager.addJob(event.args, socket);
                break;

            case 'getJobs':
                console.log(event.args);
                const jobs = workersManager.getJobs(event.args,socket);
                for(let job of jobs){
                    const event = {
                        command: "JobUpdate",
                        args: job
                    }
                    socket.emit("FromServer", event);
                }
                break;
        
            default:
                break;
        }
        console.log('event', event);
    });
    socket.on("disconnect", () => {
        console.log("Client disconnected");
        clearInterval(interval);
    });
});
    
server.listen(port, () => console.log(`Listening on port ${port}`));