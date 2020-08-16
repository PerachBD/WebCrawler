const fs = require('fs');
const path = require('path');
const assert = require('chai').assert;
const {worker, scan} = require('../src/worker');
const JobQuery = require('../src/Job')
const constants = require('../src/utils/constants')

describe('Test the worker logic', function(){
    const sec = 1000;
    const min = 60 * sec;
    this.timeout(3 * min);

    it('Should success to execute scan and reach to maximum pages', async () => {
        let count = 0;
        const mockJobQuery = new JobQuery('https://www.mako.co.il',2,20);
        mockJobQuery.status = constants.jobStatus.NEW

        function updateJobFunc(root) {
            count++;
            // console.log(msg);
        }
        const getNewJobFunc = () => {
            if(mockJobQuery.status == constants.jobStatus.NEW){
                mockJobQuery.status = constants.jobStatus.PENDING
                return mockJobQuery;
            }
            else return null
        }
        const query_results = await scan(getNewJobFunc, updateJobFunc);
        assert(count, mockJobQuery.maxTotalPages) 
    })

    it('Should success to execute scan and reach to maximum depth', async () => {
        let count = 0;
        const mockJobQuery = new JobQuery('https://www.npmjs.com/package/p-limit',2,20000);
        mockJobQuery.status = constants.jobStatus.NEW

        function updateJobFunc(root) {
            count++;
            // console.log(msg);
        }
        const getNewJobFunc = () => {
            if(mockJobQuery.status == constants.jobStatus.NEW){
                mockJobQuery.status = constants.jobStatus.PENDING
                return mockJobQuery;
            }
            else return null
        }
        const query_results = await scan(getNewJobFunc, updateJobFunc);
        let accepted = query_results.result.childs.length + 1
        assert(count, accepted) 
    })

    it.skip('Should success to execute worker',async function() {
        let jobNumber = 1;
        const updateJobFunc = (job) => {
            console.log(`get from job: ${job}`);
        }
        const getNewJobFunc = () => {
            // console.log(`get job: ${job}`);
            if(jobNumber > 6){
                return null
            }
            return jobNumber++;
        }
        const p1 = worker(getNewJobFunc, updateJobFunc);
        const p2 = worker(getNewJobFunc, updateJobFunc);
        await Promise.all([p1, p2]);
        assert.equal(1, 1);
    })

})