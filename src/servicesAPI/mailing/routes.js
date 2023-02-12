const express = require('express');
const hasPermission = require('../../middlewares/hasPermission');
const router = express.Router();
const { sendFeedback } = require('./controller');

//public
router.post('/feedback', hasPermission('public'), sendFeedback);

module.exports = router;