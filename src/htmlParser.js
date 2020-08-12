const HTMLParser = require('node-html-parser');

const parse = (baseUrl, htmlContent) => {
    const root = HTMLParser.parse(htmlContent);
    const title = (root.querySelector('title'))?root.querySelector('title').text:null;
    const links = root.querySelectorAll('a');
    const finalLinks = [];
    for(let ch of links){
        // const startLink = ch.rawAttrs.indexOf("href=");
        // const l = ch.rawAttrs.slice(startLink+6, ch.rawAttrs.length-1);
        const l = encodeURI(ch.getAttribute("href"));
        const finalLink = l.startsWith('http') ? l : `${baseUrl}${l}`;
        if(validURL(finalLink)){
            if(finalLinks.indexOf(finalLink) == -1) finalLinks.push(finalLink);
        } else {
            console.warn(`not valid link ${finalLink}`);
        }
    }
    return {
        title,
        finalLinks
    }
    console.log(title);
}



function validURL(str) {
    var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
    return regexp.test(str);
}

exports.parse = parse;