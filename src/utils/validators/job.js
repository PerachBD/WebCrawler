

exports.validate = (job) => {
    if(!job.startUrl){
        throw new Error("start url not exist");
    }
    if(!job.maxDepth){
        throw new Error("max depth not exist");
    } 
    if(!job.maxTotalPages){
        throw new Error("max total pages not exist");
    }
    return true;
}