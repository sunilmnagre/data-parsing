const express = require('express');
const app = express();

// It will call the starting function to start the parsing process
const dataParser = require('./parser');

// As we have large response of the file, we need to keep below settings.
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true }, { limit: '5mb' }));

// Expose all the routes
app.use('/api', require('./web-service/routes/index'));

// Listen on Port in Docker Container
app.listen(9000, function () {
    console.log('Web app is listening on port 9000');
});
