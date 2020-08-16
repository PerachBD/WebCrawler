// represent a node in the result tree
module.exports = class SubJob {
    constructor(url, depth) {
        this.url = url;
        this.title = null;
        this.depth = depth;
        this.childs = [];
    }
};