const fs = require('fs');
const path = require('path');
const assert = require('chai').assert;
const { worker, scan } = require('../src/worker');
const constants = require('../src/utils/constants');
const { DBManager } = require('../src/DBManager')

describe('Test the worker logic', function () {
    const sec = 1000;
    const min = 60 * sec;
    this.timeout(3 * min);
    let testDBFile = path.join(__dirname, "DBTest.json");
    let dbManager;

    it('Should success to execute scan and reach to maximum pages', async () => {
        dbManager = new DBManager(testDBFile);
        let count = 0;
        mockjob = {
            startUrl: 'https://www.mako.co.il',
            maxDepth: 3,
            maxTotalPages: 20
        }
        const newJob = dbManager.addJob(mockjob);

        function updateJobFunc(root) {
            count++;
        }
        const getNewJobFunc = () => {
            if (newJob.status == constants.jobStatus.NEW) {
                newJob.status = constants.jobStatus.PENDING
                return newJob;
            }
            else return null
        }
        const query_results = await scan(getNewJobFunc, updateJobFunc);
        assert(count, newJob.maxTotalPages)
    })

    it('Should success to execute scan and reach to maximum depth', async () => {
        dbManager = new DBManager(testDBFile);
        let count = 0;
        mockjob = {
            startUrl: 'https://www.npmjs.com/package/p-limit',
            maxDepth: 1,
            maxTotalPages: 20000
        }
        const newJob = dbManager.addJob(mockjob);
        newJob.status = constants.jobStatus.NEW;

        function updateJobFunc() {
            count++;
        }
        const getNewJobFunc = () => {
            if (newJob.status == constants.jobStatus.NEW) {
                return newJob;
            }
            else return null
        }
        const query_results = await scan(getNewJobFunc, updateJobFunc);
        let accepted = newJob.result.childs.length + 1;
        assert(count, accepted)
    })

})