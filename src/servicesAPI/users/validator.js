const Joi = require('joi')
const { maxLengthTextAreas, regexIPFS, maxLengthUsername, regexWallet, minLengthTexts } = require('../../utils/constants')

const schemaCreate = Joi.object({
    email: 
        Joi.string()
        .email(),
    firebaseID:
        Joi.string()
        .required()
})

const schemaUpdate = Joi.object({
    userID: 
        Joi.string()
        .required(),
    wallet: 
        Joi.string()
        .trim()
        .pattern(regexWallet),
    username: 
        Joi.string()
        .min(minLengthTexts)
        .max(maxLengthUsername)
        .trim(),
    bio: 
        Joi.string()
        .min(minLengthTexts)
        .max(maxLengthTextAreas)
        .trim(),
    image: 
        Joi.string()
        .pattern(regexIPFS),
    banner: 
        Joi.string()
        .pattern(regexIPFS),
    instagram:
        Joi.string(),
    twitter:
        Joi.string(),
    tiktok:
        Joi.string(),
    termsAccepted:
        Joi.boolean()
})

const schemaCheck = Joi.object({
    userID: 
        Joi.string()
        .required(),
    property: 
        Joi.string()
        .valid('instagram', 'twitter', 'tiktok', 'username'),
    value:
        Joi.string(),
})

const schemaID = Joi.object({
    userID: 
        Joi.string()
        .required()
})

module.exports = {
    schemaCreate,
    schemaUpdate,
    schemaID,
    schemaCheck
}