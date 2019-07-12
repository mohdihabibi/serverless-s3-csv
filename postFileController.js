'use strict';

const AWS = require('aws-sdk');
const s3 = new AWS.S3();
const csv=require('csvtojson')

const BUCKET = 'serverless-s3-csv-parser-bucket';
const OBJECTKEY = 'file.txt';

module.exports.uploadCSV = (file, name) => {
    return convertToJson(file)
    .then(jsonObj => storeToS3(file, jsonObj, name))
    .catch(error => {
        return error;
    })
};

function convertToJson(file){
    return csv().fromFile(file)
}

function storeToS3(file, json, name){
    let path = "csv/"+name
    return storeFile(file, path)
    .then(() => {
        path = "json/"+name
        storeFile(json, path)
    })
    .catch(error => {
        return error;
    })
}

function storeFile(file, path){
     let params = {
       "Body": file,
       "Bucket": "serverless-s3-csv-parser-bucket",
       "Key": path
    };
    return s3.upload(params, function(err, data){
       if(err) {
           return error;
       }
       return data
    }).promise();
}

