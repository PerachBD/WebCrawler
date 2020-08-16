const {executeSubJob} = require("./handlejob");
const SubJob = require('./SubJob');
const constants = require('./utils/constants');

const handlequery = async (job, updateJobProcessFunc) => {
    job.WorkStartTime = new Date();
    updateJobProcessFunc(job);
    let rootJob = new SubJob(job.startUrl, 0);
    let scanedPages = 0;
    const openJobs = [rootJob];
    let currentJob = openJobs.shift();
    // while we have not reached maximum depth or maximum pages
    while(currentJob && currentJob.depth < job.maxDepth && scanedPages < job.maxTotalPages){
        // Link processing
        const subJob = await executeSubJob(currentJob);
        // Add the result to the result of the query
        scanedPages++;
        job.scanedPagesNumber = scanedPages;
        job.currentDepth = currentJob.depth;
        job.result = rootJob;
        job.percentageDephCompletion = currentJob.depth/job.maxDepth * 100;
        job.percentagePageCompletion = scanedPages/job.maxTotalPages * 100;
        updateJobProcessFunc(job); //`${currentJob.url} have ${currentJob.childs.length} links inside`
        openJobs.push(...subJob.childs);
        // remove completed subjob from the openJobs
        currentJob = openJobs.shift();
    }
    job.status = constants.jobStatus.SUCCESS;
    job. WorkCompletionTime = new Date();
    updateJobProcessFunc(job);
}

exports.handlequery = handlequery;