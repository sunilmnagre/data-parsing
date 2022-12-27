'use strict';

const schedule = require('node-schedule');
const axios = require('axios');
const config = require('./config/default');
const mapper = require('./helpers/api-mapper');

// Run the job in every specified minute(s)
schedule.scheduleJob(`*/${config.settings.runEvery} * * * *`, () => {
    // Start the process
    console.log(`Data parsing is running in every ${config.settings.runEvery} minute(s)`);
    start();
});

// Consume web-services create and update operation for the file processing 
const processFileData = async (dataToProcess) => {
    try {
        let options = {
            method: 'POST',
            url: config.settings.serverURL + `/api/files`,
            data: dataToProcess
        };

        // This is the call to web-service for create and update opration
        await axios(options);
    } catch (error) {
        console.error(error.message);
    }
}

// Get the file from the URL that we collected after passing the JSON
const readFileFromURL = async (filePath) => {
    let options = {
        method: 'GET',
        url: filePath,
        responseType: 'arraybuffer',
    };

    try {
        // Read the file as a Binary
        const data = await axios(options);
        if (data) {
            let dataToProcess = {
                url: filePath,
                data: data.data
            }

            // Send filedata to the web-service for create and update operation
            await processFileData(dataToProcess);
        }
        return data;
    } catch (error) {
        console.error(error);
    }
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
    try {
        let data = await getRemoteData();
        if (data && data.length > 0) {
            for (let index = 0; index < data.length; index++) {
                // Read every file from the URL
                await readFileFromURL(data[index]);
            }
        }
    } catch (error) {
        console.error(error);
    }
}
