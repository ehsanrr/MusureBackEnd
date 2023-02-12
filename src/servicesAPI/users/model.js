const mongoose = require('mongoose');
const { maxLengthTextAreas, regexWallet, regexEmail, regexIPFS, maxLengthUsername, minLengthTexts } = require('../../utils/constants');

const userSchema = new mongoose.Schema({
    firebaseID: {
        type: String,
        immutable: true,
        unique: true,
        sparse: true,
        required: true
    },
    role:{
        type: String,
        immutable: false,
        required: false,
        enum: ['admin', 'user', 'supadmin'],
        default: 'user'
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        sparse: true,
        match: regexEmail,
    },
    wallet: {
        type: String,
        required: false,
        immutable: false,
        sparse: true,
        unique: true,
        match: regexWallet,
        trim: true,
        minLength: 42,
        maxLength: 42
    },
    username: {
        type: String,
        required: false,
        unique: true,
        sparse: true,
        trim: true,
        minLength: minLengthTexts,
        maxLength: maxLengthUsername
    },
    bio: {
        type: String,
        required: false,
        trim: true,
        sparse: true,
        unique:false,
        minLength: minLengthTexts,
        maxLength: maxLengthTextAreas
    },
    image: {
        type: String,
        required: false,
        trim: true,
        sparse: true,
        unique:false,
        match: regexIPFS,
    },
    banner: {
        type: String,
        required: false,
        trim: true,
        sparse: true,
        unique:false,
        match: regexIPFS,
    },
    twitter: {
        type: String,
        required: false,
        trim: true,
        unique: true,
        sparse: true,
        lowercase: true
    },
    instagram: {
        type: String,
        required: false,
        trim: true,
        unique: true,
        sparse: true,
        lowercase: true
    },
    tiktok: {
        type: String,
        required: false,
        trim: true,
        unique: true,
        sparse: true,
        lowercase: true
    },
    isValidated: {
        type: Boolean,
        required: true,
        default: false,
        sparse: false,
        unique: false,
    },
    termsAccepted: {
        type: Boolean,
        required: true,
        default: false
    }
},{
    timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User