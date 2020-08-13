const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser');
const port = 8080;

const main = async () => {

    app.use(cors());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    require("./routes/crawlerRoutes")(app)//handle the query that comes from the client

    // (req.body.URL, req.body.maxDepth, req.body.maxPages)

    app.listen(port, () => {
        console.log(`Example app listening at http://localhost:${port}`)
    })
}

main();