'use strict';

const postController = require('./postFileController');
const getController = require('./getFileController')

module.exports.uploadCSV = (event, context, callback) => {

  let csvFile =JSON.parse(event.body).csv;
  let name = event.pathParameters.name;
  postController.uploadCSV(csvFile, csv)
  .then(result => {
    const response = {
      statusCode: 200,
      body: JSON.stringify({
        result
      })
    };
    callback(null, response);
  })
  .catch(error => callback(null, error));
};

module.exports.downloadCSV = (event, context, callback) => {

  let name = event.pathParameters.name;
  getController.downloadCSV(name)
  .then(result => {
    const response = {
      statusCode: 200,
      body: JSON.stringify({
        result
      })
    };
    callback(null, response);
  })
  .catch(error => callback(null, error));
};