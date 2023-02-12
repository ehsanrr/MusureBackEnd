const express = require('express');
const hasPermission = require('../../middlewares/hasPermission');
const router = express.Router();
const { createUser, updateUser, readUser, readAllUsers, checkValue, changeID, addProperty } = require('./controller')

//public
router.post('/', hasPermission('public'), createUser);
router.get('/', hasPermission('public'), readUser);

//user
router.patch('/', hasPermission('user'), updateUser);
router.get('/check', hasPermission('user'), checkValue);

//admin
router.get('/all', hasPermission('admin'), readAllUsers)

//supadmin
// router.post('/changeID', hasPermission('supadmin'), changeID)
// router.get('/addProp', hasPermission('supadmin'), addProperty)

module.exports = router;