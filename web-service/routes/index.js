'use strict';

const router = require('express').Router();

router.use('/files', require('./api/file-pilot'));

module.exports = router;
