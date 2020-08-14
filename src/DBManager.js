const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const shortid = require('shortid');

const {validate} = require('./utils/validators/job');
const constants = require('./utils/constants');

class DBManager{
    constructor(dbFilePath){
        if(!dbFilePath){
            throw new Error('db file path is not supply.');
        }
        const adapter = new FileSync(dbFilePath)
        const db = low(adapter);
        this.db = db;
        // Set some defaults (required if your JSON file is empty)
        this.collection = db.defaults({ jobs: [] }).write()    
    }

    addJob = (job) => {
        validate(job);
        // Check if job exist in db
        const existsJobs = this.db.get(constants.jobsTable)
            .find({ startUrl: job.startUrl, maxDepth: job.maxDepth, maxTotalPages: job.maxTotalPages })
            .value();
        let resultJob;
        if(existsJobs){
            resultJob = {...existsJobs}; // not return the reference
        } else {
            const id = shortid.generate();
            this.db
            .get(constants.jobsTable)
            .push({ id, ...job, "status": constants.jobStatus.NEW })
            .write()
            job.id = id;
            resultJob = {...job};
        }
        return resultJob;
    }

    getJobs = (jobsIdList) => {
        const jobs = this.db.get(constants.jobsTable).value();
        return jobs.filter(job => jobsIdList.includes(job.id));
    }

    updateJob = (job) => {
        if(!job.id) {
            throw new Error('job id must be exist'); 
        }
        this.db.get(constants.jobsTable)
            .find({ id: job.id})
            .assign(job)
            .write();
    }

    getNewJob = () => {
        const newJobs = this.db.get(constants.jobsTable)
            .find({ "status": constants.jobStatus.NEW }).value();

        newJobs.status = constants.jobStatus.PENDING;
        this.updateJob(newJobs);
        return {...newJobs};
    }
}

exports.DBManager = DBManager;