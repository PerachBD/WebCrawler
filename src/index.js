const axios = require('axios');
const {parse} = require('./htmlParser');
const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser');
const port = 8080;



const createJob = (link) => {
    return new Promise((resolve, reject) => {
        axios.get(link).then(resp => {
            // Extract the root url in case there are relative links inside the page
            const baseUrl = get_base_url(link)
            const result = parse(baseUrl, resp.data);
            // Add a url property to the returned object
            result.url = link;
            resolve(result);
        })
        // Error while accessing url
        .catch(err => {
            console.error(err);
            resolve({
                title: `err:${err}`,
                url:link,
                Contained_links: []
            })
        });
    })
}
// Extract the root url in case there are relative links inside the page
function get_base_url(link){
    const baseUrlArr = link.split('/');
    baseUrlArr.splice(3);
    return baseUrlArr.join('/')
}


const handlequery = async (link,maxDepth,maxTotalPages) =>{
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
                const link_job = await createJob(link)
                link_job.depth=depth
                // Add the result to the result of the query
                query_result.push(link_job)
                maxTotalPages--
                // Adding the links contained in the current link to the array of jobs at the appropriate depth
                const links= link_job.Contained_links
                // Avoid adding identical links to the same depth
                for(let link of links){
                    if(!jobs[jobs.length-1].includes(link))jobs[jobs.length-1].push(link)
                }
            }
        }
        // We have completed the jobs of the links at the smallest depth and therefore the deletion of the array representing the smallest depth
        jobs.splice(0,1);
    }
    return query_result;
}

const main =  async () => {

    app.use(cors());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.post('/api/sbmitCrawlerForm',(req, res) => {
        console.log(req.body.URL, req.body.maxDepth, req.body.maxPages);
        const query_result = handlequery(req.body.URL, req.body.maxDepth, req.body.maxPages)
        res.send(
          `I received your POST request. This is what you sent me: ${req}`,
        );
    });
    
    app.listen(port, () => {
        console.log(`Example app listening at http://localhost:${port}`)
    })

    // get query from frontend
    const link = 'https://www.npmjs.com/package/node-html-parser';
    const maxDepth = 2;
    let maxTotalPages=100;


    //execute the query
    // const query_result = await handlequery(link,maxDepth,maxTotalPages)
    console.log("jjj")
}

main();