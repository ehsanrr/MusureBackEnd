const express = require('express');
const hasPermission = require('../../middlewares/hasPermission');
const { googleSheetUsers, googleSheetCreations } = require('./controller');
const router = express.Router();

//public
router.get('/users', hasPermission('public'), googleSheetUsers);
router.get('/creations', hasPermission('public'), googleSheetCreations);

module.exports = router;