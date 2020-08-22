const { executeSubJob } = require("./handlejob");
const SubJob = require('./SubJob');
const constants = require('./utils/constants');

const handlequery = async (job, updateJobProcessFunc,getPausedJobsFunc) => {
    let rootJob;
    let scanedPages;
    let openJobs = [];

    if(!job.result){
        // assign the start time of working the job
        job.WorkStartTime = new Date();
        // update the WorkStartTime at the db
        updateJobProcessFunc(job);
        // create the first node in the tree of result
        rootJob = new SubJob(job.startUrl, 0);
        // init the number og scaned pages
        scanedPages = 0;
        // init the list of not scaned pages
        openJobs = [rootJob];
    }
    else {
        rootJob = job.result;
        scanedPages = job.scanedPagesNumber;
        openJobs = job.pausedJobState;
        job.pausedJobState = [];
    }
    // shift the first job to work on from the list
    let currentJob = openJobs.shift();
    

    // while we have not reached maximum depth and maximum pages and wh do have not scaned pages in the stack
    while (currentJob && currentJob.depth < job.maxDepth && scanedPages < job.maxTotalPages) {
        // Link processing
        const subJob = await executeSubJob(currentJob);
        // increase the number of scaned pages after scan was finished
        scanedPages++;
        // update the job
        job.scanedPagesNumber = scanedPages;
        job.currentDepth = currentJob.depth;
        job.result = rootJob;
        job.percentageDephCompletion = currentJob.depth / job.maxDepth * 100;
        job.percentagePageCompletion = scanedPages / job.maxTotalPages * 100;
        updateJobProcessFunc(job);

        // Add the result as a child of the job
        openJobs.push(...subJob.childs);

        const PausedJobs = getPausedJobsFunc();
        if(PausedJobs.includes(job.id)){
            job.pausedJobState=openJobs;
            job.status = constants.jobStatus.PAUSED;
            updateJobProcessFunc(job);
            return;
        }
        // remove completed subjob from the openJobs
        currentJob = openJobs.shift();
    }
    // update the job to be done
    job.status = constants.jobStatus.SUCCESS;
    job.WorkCompletionTime = new Date();
    updateJobProcessFunc(job);
}

exports.handlequery = handlequery;