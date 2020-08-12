const axios = require('axios');
const {parse} = require('./htmlParser');

// axios.get('https://www.npmjs.com/package/node-html-parser').then(resp => {

//     console.log(resp.data);

// });


const createJob = (link,depth) => {
    return new Promise((resolve, reject) => {
        axios.get(link).then(resp => {
            // console.log(resp.data);
            const baseUrlArr = link.split('/');
            baseUrlArr.splice(3);
            const baseUrl = baseUrlArr.join('/')
            const result = parse(baseUrl, resp.data);
            result.url = link;
            result.depth = depth;
            resolve(result);
        }).catch(err => {
            console.error(err);
            resolve({
                title: `err:${err}`,
                url:link,
                depth,
                finalLinks: []
            })
        });
    })
}
const makequery = async(link,maxDepth,maxTotalPages) => {
    let depth=0;
    let jobs = [[link]];
    let query_result =[]
    while(depth<maxDepth&&maxTotalPages>0){
        // const links = await Promise.all(jobs[0]);
        depth++;
        jobs[jobs.length]=[]
        for(let link of jobs[0]){
            if(maxTotalPages>0){
                const link_job = await createJob(link,depth)
                query_result.push(link_job)
                const links= link_job.finalLinks
                jobs[jobs.length-1].push(...links);
                maxTotalPages--
            }
        }
        jobs.splice(0,1);
    }
    return query_result;
}

const main =  async () => {
    const link = 'https://www.npmjs.com/package/node-html-parser';
    const maxDepth = 2;
    let maxTotalPages=100;
    const query_result = await makequery(link,maxDepth,maxTotalPages)
    console.log("jjj")
}

main();