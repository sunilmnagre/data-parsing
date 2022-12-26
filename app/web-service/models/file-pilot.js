'use strict';

const redisClient = require('../../helpers/redis-client');


const find = async (fileName) => {
  return await redisClient.get(fileName);
};

module.exports = {
  find
};
