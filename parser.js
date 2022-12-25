'use strict';

const schedule = require('node-schedule');
const axios = require('axios');
const config = require('./config/default');
const mapper = require('./helpers/api-mapper');

// Run the job in every 5 minutes
schedule.scheduleJob(`*/${config.settings.runEvery} * * * *`, () => {
    start();
});


const readFileFromURL = async (filePath) => {
    let options = {
        method: 'GET',
        url: filePath,
        responseType: 'arraybuffer'
    };
    const data = await axios(options);
    return data;
}


const getRemoteData = async () => {
    try {
        const response = await axios.get(config.settings.dataURL);
        if (response.data && response.data.length > 0) {
            let data = mapper.responseMapper(response.data);
            if (data && data.length > 0) {
                readFileFromURL(data[0]);
            }
        }
    } catch (error) {
        console.error("Error getting data from source", error);
    }
}

const start = async () => {
    let data = await getRemoteData();
    let fileData = null;
    if (data && data.length > 0) {
        for (let index = 0; index < data.length; index++) {
            fileData = await readFileFromURL(data[index]);
            // Process data

            let options = {
                method: 'POST',
                url: "/api/files"
            };
            const res = await axios(options);
        }
    }
}