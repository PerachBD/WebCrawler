const HTMLParser = require('node-html-parser');

// Gets the url and its HTML content
// Extracts the relevant tags from the input
const getContainedLinks = (baseUrl, htmlContent) => {
    const root = HTMLParser.parse(htmlContent);
    // Extracts all the links elements
    const links_elements = root.querySelectorAll('a');

    // Extracts all the url links from the elements
    const Contained_links = [];
    for (let link_element of links_elements) {
        const url_link = encodeURI(link_element.getAttribute("href"));
        // If it is a relative url we will convert it to full
        const fullLink = url_link.startsWith('http') ? url_link : `${baseUrl}${url_link}`;
        // If the url is incorrect we will not save it as a contained link
        if (validURL(fullLink)) {
            // Checks we do not insert the same link twice
            if (!Contained_links.includes(fullLink)) Contained_links.push(fullLink);
        } else {
            console.warn(`not valid link ${fullLink}`);
        }
    }
    // return an object that contains the title and links we extracted
    return Contained_links
}
// Extracts the title from the html content
const getTitle = (htmlContent) => {
    const root = HTMLParser.parse(htmlContent);
    const title = (root.querySelector('title')) ? root.querySelector('title').text : null;
    return title
}


// Checks if URL is valid
function validURL(str) {
    var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
    return regexp.test(str);
}

exports.getContainedLinks = getContainedLinks;
exports.getTitle = getTitle;