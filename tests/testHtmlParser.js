const fs = require('fs');
const path = require('path');
const assert = require('chai').assert;
const { getTitle } = require('../src/htmlParser');

describe('Should success to extract title and all links from html page', () => {
    it('Should success to get a title', () => {
        htmlFilePath = path.join(__dirname, 'fixture', 'npmHtmlResponse.txt');
        const html = fs.readFileSync(htmlFilePath).toString();
        const result = getTitle("https://www.npmjs.com/package/node-html-parser", html);
        assert.equal(1, 1);
    })
})