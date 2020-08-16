const fs = require('fs');
const path = require('path');
const assert = require('chai').assert;
const { DBManager } = require('../src/DBManager');
const constants = require('../src/utils/constants');

describe('Test DBManger', () => {
    let testDBFile = path.join(__dirname, "DBTest.json");
    let dbManager;
    let fixtureJob;
    let createdJob;

    before('verfiy db for test is not exist', () => {
        if (fs.existsSync(testDBFile)) {
            fs.unlinkSync(testDBFile);
        }
    });

    it('Should success create DB Manager', () => {
        dbManager = new DBManager(testDBFile);
        const dbFileExist = fs.existsSync(testDBFile);
        assert.equal(dbFileExist, true);
    });

    it('Should success to add job and return job id', () => {
        fixtureJob = {
            startUrl: 'https://www.mako.co.il',
            maxDepth: 2,
            maxTotalPages: 10
        }
        createdJob = dbManager.addJob(fixtureJob);
        assert.exists(createdJob.id, 'addJob not return id');
    });

    it('Should success to get exists jobs', () => {
        const jobs = dbManager.getJobs([createdJob.id]);
        assert.equal(jobs.length, 1);
        assert.equal(jobs[0].id, createdJob.id);
        assert.equal(jobs[0].startUrl, createdJob.startUrl);
        assert.equal(jobs[0].maxDepth, createdJob.maxDepth);
        assert.equal(jobs[0].maxTotalPages, createdJob.maxTotalPages);
    });

    it('Should success to reUse exists jobs', () => {
        const createdJob2 = dbManager.addJob(fixtureJob);
        assert.equal(createdJob2.id, createdJob.id);
    });

    it('Should success return new job', () => {
        const newJob = dbManager.getNewJob();
        const jobs = dbManager.getJobs([newJob.id]);
        assert.equal(jobs[0].status, constants.jobStatus.PENDING);
    });

    it('Should success to update job properties', () => {
        fixtureJob = {
            startUrl: 'https://www.mako.co.il',
            maxDepth: 2,
            maxTotalPages: 10
        }
        startUrl = 'http://mockUrlPath.com';
        createdfixtureJob = dbManager.addJob(fixtureJob);
        createdfixtureJob.status = constants.jobStatus.SUCCESS;
        createdfixtureJob.startUrl = startUrl;

        dbManager.updateProcessJob(createdfixtureJob);
        const jobs = dbManager.getJobs([createdfixtureJob.id])
        assert.equal(jobs[0].status, constants.jobStatus.SUCCESS);
        assert.equal(jobs[0].startUrl, startUrl);
    })
})