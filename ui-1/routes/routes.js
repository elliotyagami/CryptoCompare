//import React from 'react';
var fetch = require("node-fetch");
var func = require('../functions.js');

var appRouter = function (app) {

    app.get("/", function(request, response) {
        response.status(200).send("Hello! This is Public API");
    });
 
    app.get("/api/test/ping", function(request, response) {
        response.status(200).send("pong");
    });

    app.get("/api/test/env", function(request, response) {
        response.status(200).send(JSON.stringify(process.env));
    });

    app.get("/internal/ver", function(request, response) {
        response.status(200).send("SETTLE API DEMO JS v0.1.0-" + JSON.stringify(process.env.APP_GUID) + ", ServerTime: " + func.getDateUTC().toUTCString() + 
        ", APP_UID: " + JSON.stringify(process.env.APP_UID) + 
        ", APP_NAME: " + JSON.stringify(process.env.APP_NAME) +
        ", APP_TYPE: " + JSON.stringify(process.env.APP_TYPE));
    });

    app.get("/public/ver", function(request, response) {
        var app_uid = process.env.APP_UID || "test-18";
        var uri = "https://" + app_uid + "-api-1.public.settle.host/api/test/ver";
        fetch(uri).then(resp => resp.text()).then(data => {
            response.status(200).send(data);
        });
    });
  }
  
  module.exports = appRouter;