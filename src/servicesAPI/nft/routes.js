const express = require('express');
const hasPermission = require('../../middlewares/hasPermission');
const router = express.Router();
const { createNFT, readNFT, updateNFT, readAllNFTs, readNFTsFilterAndSort, addBenefit, editBenefit, deleteBenefit, changeTexturesNames, deleteNFT, transferNFT, giftNFT } = require('./controller')

//public
router.get('/', hasPermission('public'), readNFT);
router.get('/filterSort', hasPermission('public'), readNFTsFilterAndSort);

//admin
router.patch('/admin', hasPermission('admin'), updateNFT);
router.delete('/admin', hasPermission('admin'), deleteNFT);
router.patch('/admin/transfer', hasPermission('admin'), transferNFT);
router.post('/admin/gift', hasPermission('admin'), giftNFT);

//supadmin
router.get('/all', hasPermission('supadmin'), readAllNFTs);

//registered
router.post('/', hasPermission('user'), createNFT);
router.delete('/', hasPermission('user'), deleteNFT); //delete own
router.patch('/', hasPermission('user'), updateNFT); //update own
router.post('/benefit', hasPermission('user'), addBenefit);
router.patch('/benefit', hasPermission('user'), editBenefit);
router.delete('/benefit', hasPermission('user'), deleteBenefit);

module.exports = router;