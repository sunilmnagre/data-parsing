'use strict';

const controller = require('../../controllers/file-pilot');
const router = require('express').Router();

/*
 * Create file into the system
 */
router.post('/', controller._create);

/*
 * Update file into the system
 */
router.patch('/:id', controller._update);

module.exports = router;
