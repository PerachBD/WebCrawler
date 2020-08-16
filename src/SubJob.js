module.exports = class SubJob {
    constructor(url, depth){
        this.url = url;
        this.title = null;
        this.depth = depth;
        this.childs = [];
    }
};