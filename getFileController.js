'use strict';

const AWS = require('aws-sdk');
const s3 = new AWS.S3();

const BUCKET = 'serverless-s3-csv-parser-bucket';

module.exports.downloadCSV = (name) => {
    return getFileFromS3(name)
};

function getFileFromS3(name){
    let path = 'csv/'+name
    let params = {Bucket: 'myBucket', Key: path}
    return s3.getObject(params, function(err, data) {
        if (err) console.log(err, err.stack); 
        else {
            return console.log(data);           
        }
      }).promise()
}

