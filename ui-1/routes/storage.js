//import React from 'react';
var fetch = require("node-fetch");
var func = require('../functions.js');
var qs = require('querystring');

var appRouter = function (app) {

    app.get("/api/storage/ping", function(request, response) {
        response.status(200).send("pong");
    });

    app.get("/public/storage", function(request, response) {
        var app_uid = process.env.APP_UID || "test-18";
        var uri = "https://" + app_uid + "-api-1.public.settle.host";
        var fileName = qs.escape("SorageDemoPublic_" + new Date().getTime().toString() + ".txt");
        var text = qs.escape("Public Storage Test, ServerTime: " + func.getDateUTC().toUTCString());
        var uploadRequest = uri + "/api/s3/upload?name=" + fileName + "&text=" + text;
        var downloadRequest = uri + "/api/s3/download?name=" + fileName;
        var deleteRequest = uri + "/api/s3/delete?name=" + fileName;
        var uploadResponse = "none";
        var downloadResponse = "none";
        var deleteResponse = "none";
        var result = { "Error Result": "Something Went Wrong"  };
    
        fetch(uploadRequest).then(respUp => respUp.text()).then(dataUp => {
            uploadResponse = dataUp;
            console.log("Upload Response: ", uploadResponse);
            fetch(downloadRequest).then(respDn => respDn.text()).then(dataDn => {
                downloadResponse = dataDn;
                console.log("Download Response: ", dataDn);
            }).then(() => {
                fetch(deleteRequest).then(respDel => respDel.text()).then(dataDel => {
                    deleteResponse = dataDel;
                    console.log("Delete Response: ", deleteResponse);
                    result = {
                        UploadResponse: uploadResponse,
                        DownloadResponse: downloadResponse,
                        DeleteResponse: deleteResponse
                    };                  
                }).then(() => {
                    console.log("Rinal result: ", result);
                    response.status(200).send(result);
                });
            });
        });
    });
  }
  
  module.exports = appRouter;