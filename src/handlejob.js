const axios = require('axios');
const {parse} = require('./htmlParser');

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
            console.error(err.toString());
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

exports.createJob = createJob;