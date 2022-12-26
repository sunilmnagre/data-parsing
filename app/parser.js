'use strict';

const schedule = require('node-schedule');
const axios = require('axios');
const config = require('./config/default');
const mapper = require('./helpers/api-mapper');

// Run the job in every 5 minutes
schedule.scheduleJob(`*/${config.settings.runEvery} * * * *`, () => {
    // Start the process
    start();
});

const processFileData = async (dataToProcess) => {
    let options = {
        method: 'POST',
        url: config.settings.serverURL + `/api/files`,
        data: dataToProcess
    };

    // This is the call to web-service, for create and update opration
    await axios(options);
}

const readFileFromURL = async (filePath) => {
    let options = {
        method: 'GET',
        url: filePath,
        responseType: 'arraybuffer',
    };
    const data = await axios(options);
    if (data) {
        let dataToProcess = {
            url: filePath,
            data: data.data
        }
        // Process everyfile
        await processFileData(dataToProcess);
    }
    return data;
}

// Function will consume the API to get JSON data
const getRemoteData = async () => {
    try {
        let data = [];
        const response = await axios.get(config.settings.dataURL);
        if (response.data && response.data.length > 0) {
            // Because data is not structured, need to map
            let data = mapper.responseMapper(response.data);
            if (data && data.length > 0) {
                return data;
            }
        }
        return data;
    } catch (error) {
        console.error("Error getting data from source", error);
        return [];
    }
}

// Consume the API in order to get the JSON data
const start = async () => {
    let data = await getRemoteData();
    let fileData = null;
    if (data && data.length > 0) {
        for (let index = 0; index < data.length; index++) {
            // Read every file from the URL
            fileData = await readFileFromURL(data[index]);
        }
    }
}