var express = require("express");
var bodyParser = require("body-parser");
var routes = require("./routes/routes.js");
var storage = require("./routes/storage.js");
var app = express();
var cors = require('cors');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

routes(app);
storage(app);

var server = app.listen(7000, function () {
    console.log("API App started on port.", server.address().port);
});

server.timeout = 150000;