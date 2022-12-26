'use strict';

const redis = require('redis');

// Let's create a redisClient
const redisClient = redis.createClient({
    host: 'app-redis',
    port: 6379
});

// Get the value from instance
const get = async (keyId) => {
    return await redisClient.get(keyId);
}

// Set the value to instance
const set = async (keyId, value) => {
    redisClient.set(keyId, numVisits);
}

module.exports = {
    get,
    set
}