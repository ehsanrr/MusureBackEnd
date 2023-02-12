const express = require('express');
const { webhookController } = require('./controller');
const router = express.Router();

router.post('/webhook', webhookController);

module.exports = router;