const {createJob} = require("./handlejob");

const handlequery = async (link,maxDepth, maxTotalPages) => {
    const result = await executequery(link, maxDepth, maxTotalPages)
    return result
}

const executequery = async (link, maxDepth, maxTotalPages) => {
    let depth=0;
    let jobs = [[link]];
    let query_result =[]

    // while we have not reached maximum depth or maximum pages
    while(depth<maxDepth && maxTotalPages>0){
        depth++;
        // Create a new array for links at current depth
        jobs[jobs.length]=[]

        // For each link from the links in the smallest depth
        for(let link of jobs[0]){
            // Checking that we did not reach the maximum pages
            if(maxTotalPages>0){
                // Link processing
                const link_job = await createJob(link);
                link_job.depth=depth;
                // Add the result to the result of the query
                query_result.push(link_job);
                maxTotalPages--;
                // Adding the links contained in the current link to the array of jobs at the appropriate depth
                const links= link_job.Contained_links;
                // Avoid adding identical links to the same depth
                for(let link of links){
                    if(!jobs[jobs.length-1].includes(link)){
                        jobs[jobs.length-1].push(link);
                    }
                }
            }
        }
        // We have completed the jobs of the links at the smallest depth and therefore the deletion of the array representing the smallest depth
        jobs.splice(0,1);
    }
    
    // socket.emit("FromAPI", JSON.stringify(query_result));
    return query_result;
}

exports.handlequery = handlequery;