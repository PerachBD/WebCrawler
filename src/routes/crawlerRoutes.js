const express = require("express");
const router = express.Router();
const {handlequery} = require("../handlequery");

router.get("/", (req, res) => {
  res.send({ response: "I am alive" }).status(200);
});

router.post('/api/sbmitCrawlerForm',(req, res) => {
    console.log(req.body.URL, req.body.maxDepth, req.body.maxPages);
    const query_result = handlequery(req.body.URL, req.body.maxDepth, req.body.maxPages)
    res.send(
      `${query_result}`,
    );
    return(req.body);
});

router.get('/queryResult', (req, res) => {
  console.log('queryResult');
  res.send({ express: 'Hello From Express' });
});

module.exports = router;
