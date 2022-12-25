'use strict';

const axios = require('axios');
const config = require('../../config/default');

/**
 * Create 
 * @param {Object} request The Standard ExpressJS request
 * @param {Object} response The Standard ExpressJS request
 * @return {json} Error object
 */
const _create = async (request, response) => {
  try {
    // Create logic goes here
    return response.send('Success');
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
const _update = async (request, response) => {
  try {
    let options = {
      method: 'POST',
      url: config.settings.serverURL + "/api/files"
    };
    const res = await axios(options);

    // Update logic goes here
    return response.send("res");

  } catch (error) {
    console.log(error);
    return response.status(500).send({
      message: 'Update error'
    });
  }
};

module.exports = {
  _create,
  _update
};
