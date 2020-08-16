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
    // get list of jobs by ids from db
    getJobs = (jobsIdList) => {
        return this.dbManager.getJobs(jobsIdList);
    }
    // get a job with status new from db
    getNewJobFunc = () => {
        return this.dbManager.getNewJob();
    }
    // update a job to the db and to UI
    updateJobProcessFunc = (job) => {
        console.log(`submit page: ${job.scanedPagesNumber}`);
        this.dbManager.updateProcessJob(job);
        const event = {
            command: "JobUpdate",
            args: job
        }
        this.socket.emit("FromServer", event);
    }
    // add new job to db, and to UI
    addJob = (job, socket) => {
        this.socket = socket;
        socket.emit("FromServer", 'job added');
        this.dbManager.addJob(job);
    }    
}