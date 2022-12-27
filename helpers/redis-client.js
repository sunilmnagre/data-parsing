'use strict';

const redis = require('redis');
const config = require('../config/default');

// Let's create a redisClient
const redisClient = redis.createClient({ url: config.settings.redisConnect });

// Get the value from instance
const get = async (keyId) => {
    try {
        await redisClient.connect();
        const value = await redisClient.get(keyId);
        await redisClient.disconnect();
        return value;
    } catch (error) {
        console.error(error);
        return false;
    }
}

// Set the value to instance
const set = async (keyId, value) => {
    try {
        await redisClient.connect();
        await redisClient.set(keyId, value);
        await redisClient.disconnect();
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}

module.exports = {
    get,
    set
}