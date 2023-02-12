const Joi = require('joi')
const { maxLengthNames, maxLengthTextAreas, NFTS_TYPES, regexWallet, regexIPFS, regexMongoID, minLengthTexts, maxLengthBenefitOverview } = require('../../utils/constants')

const schemaCreate = Joi.object({
    name: 
        Joi.string()
        .min(minLengthTexts)
        .max(maxLengthNames)
        .trim()
        .required(),
    lore: 
        Joi.string()
        .min(minLengthTexts)
        .max(maxLengthTextAreas)
        .trim()
        .required(),
    type: 
        Joi.any()
        .valid(...NFTS_TYPES)
        .required(),
    texture_1:
        Joi.string()
        .pattern(regexIPFS)
        .required(),
    texture_2:
        Joi.string()
        .pattern(regexIPFS),
    imageNFT: 
        Joi.string()
        .pattern(regexIPFS)
        .required(),
    price: 
        Joi.number()
        .min(18),
    userID: Joi.string().pattern(regexMongoID).required()
})

const schemaRead = Joi.object({
    idNFT: Joi.string().pattern(regexMongoID).required()
})

const schemaUpdate = Joi.object({
    idNFT: Joi.string().pattern(regexMongoID).required(),
    name:
        Joi.string()
        .trim()
        .max(maxLengthNames)
        .min(minLengthTexts),
    lore: 
        Joi.string()
        .min(minLengthTexts)
        .max(maxLengthTextAreas)
        .trim(),
    teaser:
        Joi.string()
        .pattern(regexIPFS),
    price: 
        Joi.number()
        .min(18),
})

const schemaFilterAndSort = Joi.object({
    userID:
        Joi.string()
        .empty("null")
        .pattern(regexMongoID),
    filterMinted:
        Joi.boolean()
        .empty("null"),
    filterType:
        Joi.string()
        .empty("null")
        .valid(...NFTS_TYPES),
    sortCreatedAt:
        Joi.string()
        .empty("null")
        .valid('ascending', 'descending'),
    name:
        Joi.string()
        .min(1)
        .max(maxLengthNames)
        .empty("null")
        .trim(),
    page:
        Joi.number()
        .min(0)
        .max(999)
})

const schemaBenefitAdd = Joi.object({
    idNFT: 
        Joi.string().pattern(regexMongoID).required(),
    benefit:
        Joi.object({
            overview: Joi.string().min(minLengthTexts).max(maxLengthBenefitOverview).trim().required(),
            description: Joi.string().min(minLengthTexts).max(maxLengthTextAreas).trim().required(),
            image: Joi.string().pattern(regexIPFS)
        })
        .required()
})

const schemaBenefitEdit = Joi.object({
    idNFT: 
        Joi.string().pattern(regexMongoID).required(),
    benefit:
        Joi.object({
            overview: Joi.string().min(minLengthTexts).max(maxLengthBenefitOverview).trim().required(),
            description: Joi.string().min(minLengthTexts).max(maxLengthTextAreas).trim().required(),
            image: Joi.string().pattern(regexIPFS)
        })
        .required(),
    benefitID:
        Joi.string().pattern(regexMongoID)
})

const schemaBenefitDelete = Joi.object({
    idNFT: 
        Joi.string().pattern(regexMongoID).required(),
    benefitID:
        Joi.string().pattern(regexMongoID)
})

const schemaTransfer = Joi.object({
    idNFT: 
        Joi.string().pattern(regexMongoID).required(),
    email:
        Joi.string().email().required()
})

const schemaGift = Joi.object({
    idNFT: 
        Joi.string().pattern(regexMongoID).required(),
    receiverEmail:
        Joi.string().email().empty("null"),
    receiverWallet:
        Joi.string().pattern(regexWallet).empty("null")
})

module.exports = {
    schemaCreate,
    schemaRead,
    schemaUpdate,
    schemaFilterAndSort,
    schemaBenefitAdd,
    schemaBenefitEdit,
    schemaBenefitDelete,
    schemaTransfer,
    schemaGift
}