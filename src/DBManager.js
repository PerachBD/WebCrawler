const path = require('path');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const shortid = require('shortid');
const { validate } = require('./utils/validators/job');
const constants = require('./utils/constants');
const deafultDBFilePath = path.join(__dirname, "DB.json");

class DBManager {
    constructor(dbFilePath = deafultDBFilePath) {
        if (!dbFilePath) {
            throw new Error('db file path is not supply.');
        }
        const adapter = new FileSync(dbFilePath)
        const db = low(adapter);
        this.db = db;
        // Set some defaults (required if your JSON file is empty)
        this.collection = db.defaults({ jobs: [] }).write()
    }

    // add new job to db, if exist return it
    addJob = (job) => {
        validate(job);
        console.log(`Start insert job to db startUrl: ${job.startUrl}, maxDepth: ${job.maxDepth}, maxTotalPages: ${job.maxTotalPages}`);
        // Check if job exist in db
        const existsJobs = this.db.get(constants.jobsTable)
            .find({ startUrl: job.startUrl, maxDepth: job.maxDepth, maxTotalPages: job.maxTotalPages })
            .value();
        let createdJob;
        if (existsJobs) {
            console.log(`Job alresdy exixst at DB.`);
            createdJob = { ...existsJobs }; // not return the reference
        } else {
            const id = shortid.generate();
            this.db
                .get(constants.jobsTable)
                .push({ id, ...job, status: constants.jobStatus.NEW, scanedPagesNumber: 0, currentDepth: null,pausedJobState:[], CreationTime: new Date().toString(), WorkStartTime: null, WorkCompletionTime: null, percentageDephCompletion: null, percentagePageCompletion: null, Result: null })
                .write()
            job.id = id;
            createdJob = { ...job };
        }
        console.log(`Finish insert job`);
        return createdJob;
    }

    // get list of jobs by ids
    getJobs = (jobsIdList) => {
        const jobs = this.db.get(constants.jobsTable).value();
        return jobs.filter(job => jobsIdList.includes(job.id));
    }

    // update a job to the db
    updateProcessJob = (job) => {
        if (!job.id) {
            throw new Error('job id must be exist');
        }
        this.db.get(constants.jobsTable)
            .find({ id: job.id })
            .assign(job)
            .write();
    }

    // get a job with status new
    getNewJob = () => {
        let newJobs = this.db.get(constants.jobsTable)
            .find({ "status": constants.jobStatus.NEW }).value();

        if(!newJobs) newJobs = this.db.get(constants.jobsTable).find({"status": constants.jobStatus.RESUMED}).value();

        if (newJobs) {
            newJobs.status = constants.jobStatus.PENDING;
            this.updateProcessJob(newJobs);
            return { ...newJobs };
        }
        else return null
    }
}

exports.DBManager = DBManager;