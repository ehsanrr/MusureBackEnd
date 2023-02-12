const pinataSDK = require('@pinata/sdk');
const { pinataApiKey, pinataSecret } = require('../../config/config');
const pinata = pinataSDK( pinataApiKey, pinataSecret);

module.exports = pinata