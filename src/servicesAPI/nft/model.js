
const mongoose = require('mongoose');
const { maxLengthNames, maxLengthTextAreas, NFTS_TYPES, regexIPFS, minLengthTexts, maxLengthBenefitOverview } = require('../../utils/constants');

const Benefits = new mongoose.Schema({
    overview:{
        type: String,
        required: true,
        trim: true,
        unique: false,
        sparse: true,
        minLength: minLengthTexts,
        maxLength: maxLengthBenefitOverview
    },
    description:{
        type: String,
        required: true,
        trim: true,
        unique: false,
        sparse: true,
        minLength: minLengthTexts,
        maxLength: maxLengthTextAreas
    },
    image: {
        type: String,
        required: false,
        trim: true,
        sparse: true,
        unique: false,
        match: regexIPFS,
    },
})

const NFTSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: false,
        sparse: true,
        minLength: minLengthTexts,
        maxLength: maxLengthNames
    },
    lore: {
        type: String,
        required: true,
        trim: true,
        sparse: true,
        unique: false,
        minLength: minLengthTexts,
        maxLength: maxLengthTextAreas
    },
    type: {
        type: String,
        required: true,
        trim: true,
        immutable: true,
        sparse: true,
        unique: false,
        enum: NFTS_TYPES
    },
    texture_1: {
        type: String,
        required: true,
        trim: true,
        sparse: true,
        unique: false,
        match: regexIPFS,
        immutable: false
    },
    texture_2: {
        type: String,
        required: false,
        trim: true,
        sparse: true,
        unique: false,
        match: regexIPFS,
        immutable: false
    },
    imageNFT: {
        type: String,
        required: true,
        trim: true,
        sparse: true,
        unique: false,
        match: regexIPFS,
        immutable: false
    },
    videoNFT: {
        type: String,
        required: false,
        trim: true,
        sparse: true,
        unique: false,
        match: regexIPFS,
        immutable: false
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        immutable:false,
        sparse: true,
        unique: false,
        ref: 'User'
    },
    teaser: {
        type: String,
        required: false,
        match: regexIPFS,
        sparse: true,
        unique: false,
    },
    QR: {
        type: String,
        required: true,
        trim: true,
        match: regexIPFS,
        immutable: false,
        sparse: true,
        unique: false,
    },
    benefits:{
        type: [Benefits],
        required: false,
        immutable: false,
        unique: false
    },
    price:{
        type: Number,
        required: false,
        min: 18
    },
    onSale: {
        type: String,
        required: false
    }
},{
    timestamps: true
});

const NFT = mongoose.model('NFT', NFTSchema);

module.exports = NFT