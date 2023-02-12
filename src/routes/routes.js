const express = require('express');
const user = require('../servicesAPI/users/routes');
const nft = require('../servicesAPI/nft/routes');
const typesNFT = require('../servicesAPI/nftTypes/routes');
const management = require('../servicesAPI/management/routes')
const mailing = require('../servicesAPI/mailing/routes')
const crossmint = require('../services/Crossmint/routes')
const database = require('../servicesAPI/database/routes')
const router = express.Router();

router.use('/user', user)
router.use('/NFT', nft)
router.use('/mailing', mailing)

router.use('/typesNFT', typesNFT)
router.use('/management', management)

router.use('/database', database)
router.use('/crossmint', crossmint)

module.exports = router;