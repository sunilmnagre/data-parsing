'use strict';

const fs = require("fs");
const path = require('path');
const parseModel = require('../models/file-pilot');

// Parse the string and get the name of the file
const getFileNameFromURL = (url) => {
  let urlArr = url.split('/');
  return urlArr[urlArr.length - 1];
}

/**
 * Create 
 * @param {Object} request The Standard ExpressJS request
 * @param {Object} response The Standard ExpressJS request
 * @return {json} Error object
 */
const _create = async (request, response) => {
  try {
    if (request.body) {
      // Collect filename for the further processing
      let fileName = getFileNameFromURL(request.body.url);

      if (!parseModel.find(fileName)) {
        fileWriteOps(fileName, request.body.data);
      } else {
        console.warn(`Duplication file name ${fileName}`);
        _update(fileName, request.body.data);
      }

      return response.send('Success');
    }
  } catch (error) {
    return response.status(500).send({
      message: 'Creation error'
    });
  }
};

/**
 * Update 
 * @param {Object} request The Standard ExpressJS request
 * @param {Object} response The Standard ExpressJS request
 * @return {json} Error object
 */
const _update = async (filename, data) => {
  try {
    fileWriteOps(filename, data);
  } catch (error) {
    console.log(error);
  }
};

// Write file into the system
const fileWriteOps = async (filepath, data) => {
  try {
    const fileDir = '../../../datafiles';
    const filePath = path.resolve(__dirname, fileDir) + '/' + fileName;

    // Create a new file
    fs.writeFileSync(filePath, data);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  _create,
  _update
};
