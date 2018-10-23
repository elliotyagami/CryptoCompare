var func = require('../functions.js');
var stor = require('../storage.js');

var app_uid = process.env.APP_UID || "test-18";
var app_type = process.env.APP_TYPE || "public";
var folder = app_uid + "/" + app_type + "/";

var appRouter = function (app) {

    app.get("/api/storage/ping", function(request, response) {
        response.status(200).send("pong");
    });

    app.get("/api/s3/upload", function(request, response) {
        console.log("Upload request.", request.query);
        stor.uploadText(folder + request.query.name, request.query.text).then(result => {
            response.status(200).send(result);
        }).catch(err => {
            response.status(500).send(JSON.stringify(err));
        });
    });

    app.get("/api/s3/download", function(request, response) {
        console.log("Download request.", request.query);
        stor.downloadText(folder + request.query.name).then(result => {
            response.status(200).send(result);
        }).catch(err => {
            response.status(500).send(JSON.stringify(err));
        });
    });

    app.get("/api/s3/delete", function(request, response) {
        console.log("Delete request.", request.query);
        stor.deleteObject(folder + request.query.name).then(result => {
            response.status(200).send(result);
        }).catch(err => {
            response.status(500).send(JSON.stringify(err));
        });
    });
  }
  
  module.exports = appRouter;
  
  
  
  
