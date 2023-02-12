const sgMail = require('@sendgrid/mail');
const { emailAPIKey } = require('../../config/config');

async function sendEmailFeedback ( text, name, email ) {

    sgMail.setApiKey(emailAPIKey)

    let msg = {
        to: "kvuiDO5JPE-md98CNOi3bw@feedback.storiesonboard.com",
        from: "hi@musure.world",
        subject: `Feedback from ${name? name : "Anonymous"}`,
        text: `${text}. ${email? `Contact email: ${email}` : ""}`
    }

    return sgMail.send(msg)
}

module.exports = sendEmailFeedback