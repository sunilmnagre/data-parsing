'use strict';

const parseModel = require('../models/file-pilot');

// Parse the string and get the name of the file
const getFileNameFromURL = (url) => {
  if (url) {
    let urlArr = url.split('/');
    return urlArr[urlArr.length - 1];
  }
  return null;
}

/**
 * Create 
 * @param {Object} request The Standard ExpressJS request
 * @param {Object} response The Standard ExpressJS request
 * @return {json} Error object
 */
const _create = async (request, response) => {
  if (!request.body) {
    return response.status(400).send('Missing required parameters');
  }

  try {
    if (!request.body.url) {
      return response.status(400).send('URL param is missing in passed parameteres');
    }

    // Collect filename for the further processing
    let fileName = getFileNameFromURL(request.body.url);
    let isFileExists = await parseModel.find(fileName);
    if (!isFileExists) {
      await parseModel.createFile(fileName, request.body);
    } else {
      let alreadyExistData = JSON.parse(isFileExists);
      let repeated = alreadyExistData.repeated + 1;
      let duplicate = {
        fileName: fileName,
        repeated: repeated
      };

      let newFileName = fileName + '_' + repeated;
      await _update(newFileName, request.body, duplicate);
      console.warn(`Duplicate file to process, filename - "${fileName}"`);
    }

    return response.send('Success');
  } catch (error) {
    console.error(error);
    return response.status(500).send({
      message: 'File creation error'
    });
  }
};

/**
 * Update 
 * @param {String} filename Name of the file
 * @param {Object} data Filedata
 * @param {String} duplicate filename
 * @return {json} Error object
 */
const _update = async (fileName, data, duplicate) => {
  try {
    return await parseModel.createFile(fileName, data, duplicate);
  } catch (error) {
    console.error(error);
    return false;
  }
};

module.exports = {
  _create,
  _update
};
