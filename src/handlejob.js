const axios = require('axios');
const {getTitle, getContainedLinks} = require('./htmlParser');
const SubJob = require('./SubJob');

const executeSubJob = async (subJob) => {
    return new Promise((resolve, reject) => {
    axios.get(subJob.url).then(resp => {
        // Extract the root url in case there are relative links inside the page
        const baseUrl = get_base_url(subJob.url);
        subJob.title = getTitle(resp.data);
        const containedLinkes = getContainedLinks(baseUrl,resp.data);
        for(let link of containedLinkes){
            let child = new SubJob(link, subJob.depth + 1);
            subJob.childs.push(child);
        }
        resolve(subJob);
    })
    // Error while accessing url
    .catch(err => {
        console.error(err.toString());
        subJob.title = `err:${err}`;
        resolve(subJob);
    });
    })
}
// Extract the root url in case there are relative links inside the page
function get_base_url(link){
    const baseUrlArr = link.split('/');
    baseUrlArr.splice(3);
    return baseUrlArr.join('/');
}

exports.executeSubJob = executeSubJob;