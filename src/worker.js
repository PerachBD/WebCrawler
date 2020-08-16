const {handlequery} = require('./handlequery');

function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
} 

const scan = async (getNewJobFunc, updateJobFunc) => {
    // get job with status new to be execute
    const newjob = await getNewJobFunc();
    if(newjob) {
        console.log('working on new job');
        // execute the job
        const result = await handlequery(newjob, updateJobFunc)
        console.log('finish working on job');
        return result;
    } else {
        await sleep(3000)
    }
}
exports.scan = scan;

exports.worker = async (getNewJobFunc, updateJobFunc) => {
    while(1){
        // the worker all the time or executinng job or waiting for new job
      await scan(getNewJobFunc, updateJobFunc);
    }
}
