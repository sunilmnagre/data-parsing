'use strict';

const express = require('express');
const app = express();

app.use(express.json());

// Expose all the routes
app.use('/api', require('./web-service/routes/index'));

const port = process.env.PORT ?? 9000;
app.listen(port, () => {
    console.log(`Server started at port: ${port}`);
});