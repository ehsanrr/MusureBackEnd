const mongoose = require('mongoose');
const { NFTS_TYPES, regexIPFS } = require('../../utils/constants');

const TypesNFTSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
        trim: true,
        sparse: true,
        unique: true,
        immutable: true,
        enum: NFTS_TYPES
    },
    assetBase: {
        type: String,
        default: undefined,
        trim: true,
        sparse: true,
        unique: false,
        match: regexIPFS,
    },
    textureMaster_1: {
        type: String,
        default: undefined,
        trim: true,
        sparse: true,
        unique: false,
        match: regexIPFS,
    },
    textureMaster_2: {
        type: String,
        default: undefined,
        trim: true,
        sparse: true,
        unique: false,
        match: regexIPFS,
    },
},{
    timestamps: true
});

const TYPES_NFT_MASTER = mongoose.model('TYPES_NFT_MASTER', TypesNFTSchema);

module.exports = TYPES_NFT_MASTER