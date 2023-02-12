const Joi = require('joi')
const { maxLengthNames, minLengthTexts, maxLengthFeedback } = require('../../utils/constants')

const schemaFeedback = Joi.object({
    name: Joi.string().min(minLengthTexts).max(maxLengthNames).empty(""),
    feedback: Joi.string().min(minLengthTexts).max(maxLengthFeedback).required(),
    email: Joi.string().email().empty("")
})

module.exports = {
    schemaFeedback
}