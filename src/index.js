const http = require("http");
const express = require('express');
const bodyParser = require('body-parser');
const socketIo = require("socket.io");
const cors = require('cors');
const { WorkersManager } = require('./WorkersManager');
const constants = require('./utils/constants')

const port = 8080;
const app = express()

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const server = http.createServer(app);
const io = socketIo(server);


io.on("connection", (socket) => {
    console.log("New client connected");
    const workersManager = new WorkersManager(2,socket);
    socket.on("FromClient", async (event) => {
        if (!event.command) {
            throw new Error('not command in the request')
        }
        console.log('Server got command: ', event.command);
        switch (event.command) {
            case 'NewScanJob':
                workersManager.addJob(event.args);
                break;

            case 'getJobs':
                console.log(event.args);
                const jobs = workersManager.getJobs(event.args);
                for (let job of jobs) {
                    const event = {
                        command: "JobUpdate",
                        args: job
                    }
                    socket.emit("FromServer", event);
                }
                break;
            case 'pauseJob':
                workersManager.pausedJobs.push(event.args);
                break;
            case 'resumeJob':
                workersManager.pausedJobs.splice(workersManager.pausedJobs.indexOf(event.args),1);
                resumedJob = workersManager.getJobs([event.args])[0];
                resumedJob.status = constants.jobStatus.RESUMED;
                workersManager.updateJobProcessFunc(resumedJob);
                break;
            default:
                break;
        }
        console.log('event', event);
    });
    socket.on("disconnect", () => {
        console.log("Client disconnected");
    });
});

server.listen(port, () => console.log(`Listening on port ${port}`));