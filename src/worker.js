const {handlequery} = require('./handlequery');


function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}
function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
} 

const scan = async (getNewJobFunc, updateJobFunc) => {
    const newjob = await getNewJobFunc();
    if(newjob) {
        console.log('working on new job');
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
      await scan(getNewJobFunc, updateJobFunc);
    }
      
}
