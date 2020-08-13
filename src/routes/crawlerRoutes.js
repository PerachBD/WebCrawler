const {handlequery} = require("../handlequery")


module.exports = app =>{

    app.post('/api/sbmitCrawlerForm',(req, res) => {
        console.log(req.body.URL, req.body.maxDepth, req.body.maxPages);
        const query_result = handlequery(req.body.URL, req.body.maxDepth, req.body.maxPages)
        res.send(
          `${query_result}`,
        );
        return(req.body);
    });

    app.get('/queryResult', (req, res) => {
      res.send({ express: 'Hello From Express' });
    });

}