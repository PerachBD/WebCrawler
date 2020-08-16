const {DBManager} = require('./DBManager');
var fs = require('fs');
const { worker } = require('./worker');

exports.WorkersManager = class {
    constructor(numberOfWorkers){
        this.dbManager = new DBManager();
        this.workers = []
        for(let i =0; i<numberOfWorkers; i++){
            this.workers.push(worker(this.getNewJobFunc, this.updateJobProcessFunc))
        }

    }
    getJobs = (jobsIdList) => {
        return this.dbManager.getJobs(jobsIdList);
    }
    getNewJobFunc = () => {
        return this.dbManager.getNewJob();
    }
    updateJobProcessFunc = (job) => {
        console.log(`submit page: ${job.scanedPagesNumber}`);
        this.dbManager.updateProcessJob(job);
        const event = {
            command: "JobUpdate",
            args: job
        }
        this.socket.emit("FromAPI", event);
    }

    addJob = (job, socket) => {
        this.socket = socket;
        socket.emit("FromAPI", 'job added');
        this.dbManager.addJob(job);
    }    
}