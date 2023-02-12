const sgMail = require('@sendgrid/mail');
const { emailAPIKey } = require('../../config/config');

async function sendEmailWelcome ( email ) {

    sgMail.setApiKey(emailAPIKey)

    let msg = {
        to: email,
        from: "hi@musure.world",
        subject: 'Welcome to MUSURE world',
        template_id: 'd-f21030b6937e4d96b8a5999b245fb7a6'
    }

    return sgMail.send(msg)
}

module.exports = sendEmailWelcome