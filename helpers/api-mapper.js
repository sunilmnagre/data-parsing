/**
 * Maps response into provided input structure
 * @param {array} data - Data to be mapped
 * @param {object} resultArray - Mapper structure from and to fields
 * @return {array} - Mapped data
 */
const mapObject = (data, resultArray) => {
    if (typeof data === 'object') {
        Object.keys(data).map(function (key) {
            if (typeof data[key] === 'object') {
                mapObject(data[key], resultArray);
            } else {
                if (data[key]) {
                    resultArray.push(data[key]);
                }
            }
        });
    } else {
        resultArray.push(data);
    }
};

/**
 * Maps the response into structured array
 * @param {array} result - Data to be mapped
 * @return {array} - Mapped data
 */
const responseMapper = (result) => {
    let resultArray = [];
    result = JSON.parse(JSON.stringify(result));
    if (Array.isArray(result)) {
        result.map(function (objectToMap) {
            mapObject(objectToMap, resultArray);
        });
    }
    return resultArray;
};

module.exports = { responseMapper };