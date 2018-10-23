function uploadText(path, text, callback)
{
    var AWS = require('aws-sdk');
    var bucketName = "app-cluster";
    var s3 = new AWS.S3();  
    var params = { Bucket: bucketName, Key: path, Body: text };
    
    console.log("Calling putObject with parameters.", params);
    var putObj = s3.putObject(params).promise();
    
    return putObj.then(function(data) {
        console.log("Success, uploaded: " + bucketName + "/" +  path);
        return JSON.stringify(data);
    }).catch(function(err) {
        console.log("Error: ", err);
        return JSON.stringify(err);
    });
}

function downloadText(path, callback)
{
    var AWS = require('aws-sdk');
    var bucketName = "app-cluster";
    var s3 = new AWS.S3();  
    var params = { Bucket: bucketName, Key: path };
    var getObj = s3.getObject(params).promise();

    console.log("Calling getObject with parameters.", params);
    return getObj.then(function(data) {
        console.log("Success, downloaded: " + bucketName + "/" +  path);
        return data.Body.toString('utf-8');
    }).catch(function(err) {
        console.log("Error: ", err);
        return JSON.stringify(err);
    });
}

function deleteObject(path, callback)
{
    var AWS = require('aws-sdk');
    var bucketName = "app-cluster";
    var s3 = new AWS.S3();  
    var params = { Bucket: bucketName, Key: path };
    var delObj = s3.deleteObject(params).promise();

    console.log("Calling deleteObject with parameters.", params);
    return delObj.then(function(data) {
        console.log("Success, deleted: " + bucketName + "/" +  path);
        return JSON.stringify(data);
    }).catch(function(err) {
        console.log("Error: ", err);
        return JSON.stringify(err);
    });
}

module.exports = { uploadText, downloadText, deleteObject };