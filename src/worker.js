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
    } 
}
exports.scan = scan;

exports.worker = async (getNewJobFunc, updateJobFunc) => {
    setInterval( function() { scan(getNewJobFunc, updateJobFunc);},3000);
}

