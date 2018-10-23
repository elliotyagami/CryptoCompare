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

    app.get("/api/test/ver", function(request, response) {
        response.status(200).send("SETTLE API DEMO JS v0.1.0-" + JSON.stringify(process.env.APP_GUID) + ", ServerTime: " + func.getDateUTC().toUTCString() + 
        ", APP_UID: " + JSON.stringify(process.env.APP_UID) + 
        ", APP_NAME: " + JSON.stringify(process.env.APP_NAME) +
        ", APP_TYPE: " + JSON.stringify(process.env.APP_TYPE) +
        ", APP_PORT: " + JSON.stringify(process.env.APP_PORT));
    });
  }
  
  module.exports = appRouter;