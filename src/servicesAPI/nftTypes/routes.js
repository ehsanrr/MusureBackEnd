const express = require('express');
const hasPermission = require('../../middlewares/hasPermission');
const router = express.Router();
const { createType, readTypes, updateTypes, deleteTypes } = require('./controller');

//supadmin
router.post('/', hasPermission('supadmin'), createType);
router.patch('/', hasPermission('supadmin'), updateTypes);
router.delete('/', hasPermission('supadmin'), deleteTypes);

//public
router.get('/', hasPermission('public'), readTypes);

module.exports = router;