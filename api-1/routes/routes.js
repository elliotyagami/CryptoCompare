var func = require('../functions.js');
const axios = require('axios');


var appRouter = function (app) {

    app.get("/", function(request, response) {
        response.status(200).send("Hello! This is Public API");
    });

    app.get("/coins", function(req, res) {
        axios.get('https://whattomine.com/coins.json')
         .then(function (response) {
            let data = response.data['coins']
            let arr = []
            for(var i in data){
                let ele = {}
                ele[i] = data[i]
                arr.push(ele)
            }
            res.status(200).json(arr);
        })
        .catch(function (error) {
            console.log(error);
            res.status(200).json([]);
        })
    });

    app.get("/api/test/ping", function(request, response) {
        response.status(200).send("pong");
    });

    app.get("/api/test/env", function(request, response) {
        response.status(200).send(JSON.stringify(process.env));
    });

    app.get("/api/test/ver", function(request, response) {
        response.status(200).send("SETTLE API DEMO JS v0.1.0-" + JSON.stringify(process.env.APP_GUID) + ", ServerTime: " + func.getDateUTC().toUTCString() +
        ", APP_UID: " + JSON.stringify(process.env.APP_UID) +
        ", APP_NAME: " + JSON.stringify(process.env.APP_NAME) +
        ", APP_TYPE: " + JSON.stringify(process.env.APP_TYPE) +
        ", APP_PORT: " + JSON.stringify(process.env.APP_PORT));
    });
  }

  module.exports = appRouter;
