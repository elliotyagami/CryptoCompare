var express = require("express");
var bodyParser = require("body-parser");
var routes = require("./routes/routes.js");
var storage = require("./routes/storage.js");
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
    console.log("incoming")
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

routes(app);
storage(app);



var server = app.listen(8000, function () {
    console.log("API App started on port.", server.address().port);
});

server.timeout = 150000;
