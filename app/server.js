const express = require('express');
const dataParser = require('./parser');
const app = express();


app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ extended: true }, { limit: '25mb' }));

// Expose all the routes
app.use('/api', require('./web-service/routes/index'));

// Listen on Port in Docker Container
app.listen(9000, function () {
    console.log('Web app is listening on port 9000');
});