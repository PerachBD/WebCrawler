const axios = require('axios');
const { getTitle, getContainedLinks } = require('./htmlParser');
const SubJob = require('./SubJob');

const executeSubJob = async (subJob) => {
    return new Promise((resolve, reject) => {
        // trying to get the content of the html page
        axios.get(subJob.url).then(resp => {
            // Extract the base url in case there are relative links inside the page
            const baseUrl = get_base_url(subJob.url);
            // get title from html content
            subJob.title = getTitle(resp.data);
            // get Contained Links from html content
            const containedLinkes = getContainedLinks(baseUrl, resp.data);
            // each link creact subjob and push it to subJob.childs stack
            for (let link of containedLinkes) {
                let child = new SubJob(link, subJob.depth + 1);
                subJob.childs.push(child);
            }
            // return subJob after all changes
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
function get_base_url(link) {
    const baseUrlArr = link.split('/');
    baseUrlArr.splice(3);
    return baseUrlArr.join('/');
}

exports.executeSubJob = executeSubJob;