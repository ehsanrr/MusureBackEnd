const Joi = require('joi')
const { regexIPFS, NFTS_TYPES } = require('../../utils/constants')

const schemaCreate = Joi.object({
    type: 
        Joi.string()
        .trim()
        .required(),
    asset:
        Joi.string()
        .pattern(regexIPFS),
    texture1:
        Joi.string()
        .pattern(regexIPFS),
    texture2:
        Joi.string()
        .pattern(regexIPFS),
})

const schemaUpdate = Joi.object({
    type: 
        Joi.string()
        .valid(...NFTS_TYPES)
        .required(),
    asset:
        Joi.string()
        .pattern(regexIPFS),
    texture1:
        Joi.string()
        .pattern(regexIPFS),
    texture2:
        Joi.string()
        .pattern(regexIPFS),

})

const schemaDelete = Joi.object({
    type: 
        Joi.string()
        .valid(...NFTS_TYPES)
        .required(),
})

module.exports = {
    schemaCreate,
    schemaUpdate,
    schemaDelete
}