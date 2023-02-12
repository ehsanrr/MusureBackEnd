const validatorJOI = require('../../utils/functions/Validator/validator');
const sendEmailFeedback = require('../../services/Mailing/feedback');
const { schemaFeedback } = require('./validator');

async function sendFeedback(req, res, next){

    //JOI VALIDATION
    const validator = validatorJOI( schemaFeedback, req.body)
    if(validator.errors){
        return res.send({
            input: validator.errors._original,
            error: validator.errors.details
        })
    }

    const { feedback, name, email } = validator.values;

    try {
        await sendEmailFeedback(feedback, name, email)

        return res.send({
            send: true,
            message: 'Email has been sent'
        })

    } catch (error) {
        next(error)
    }
};


module.exports={
    sendFeedback
}