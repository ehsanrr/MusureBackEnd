const express = require('express');
const hasPermission = require('../../middlewares/hasPermission');
const { chargeAllFields } = require('./controller');
const router = express.Router();

//supadmin
router.post('/precharge', hasPermission('supadmin'), chargeAllFields)

module.exports = router;