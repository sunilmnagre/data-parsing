'use strict';

const fs = require("fs");
const path = require('path');
const redisClient = require('../../helpers/redis-client');


const find = async (fileName) => {
  try {
    return await redisClient.get(fileName);
  } catch (error) {
    console.error(error);
    throw new Error('Error while reading storage to get file info');
  }
};

// Write file into the system
const createFile = async (fileName, info, duplicate = null) => {
  try {
    const fileDir = '../../datafiles';
    const filePath = path.resolve(__dirname, fileDir) + '/' + fileName;

    // Create a new file
    fs.writeFileSync(filePath, Buffer.from(info.data));

    let fileInfo = {
      fileName: fileName,
      url: info.url,
      data: "This will the file content", // I'm not storing the file data into Redis
      repeated: 0
    };

    await redisClient.set(fileName, JSON.stringify(fileInfo));

    if (duplicate) {
      let fileInfo = {
        fileName: duplicate.fileName,
        url: info.url,
        data: "This will the file content",
        repeated: duplicate.repeated
      };
      await redisClient.set(duplicate.fileName, JSON.stringify(fileInfo));
    }
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  find,
  createFile
};
