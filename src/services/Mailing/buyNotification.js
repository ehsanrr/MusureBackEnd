const sgMail = require('@sendgrid/mail');
const { emailAPIKey, enviromentFront } = require('../../config/config');

async function buyNotification ( nft, email ) {

    sgMail.setApiKey(emailAPIKey)

    let msg = {
        to: ['tano@musure.world', 'contactolino@gmail.com'],
        from: "hi@musure.world",
        subject: `Nueva venta MUSURE world`,
        template_id: 'd-8de67c04790241a19c4f07f179652009',
        dynamic_template_data: {
            "name": nft.name,
            "url": `${enviromentFront}/detailnft/${nft._id}`,
            "price": nft.price,
            "email": email
        }
    }

    return sgMail.send(msg)
}

module.exports = buyNotification