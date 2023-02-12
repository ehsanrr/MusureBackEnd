require('dotenv').config();

module.exports = {
    mongoURL : process.env.MONGODB_URL,
    PORT : process.env.PORT,
    enviromentFront: process.env.ENVIROMENT_FRONT,
    enviromentBack: process.env.ENVIROMENT_BACK,
    BearerTwitter : process.env.BEARER_TWITTER,
    pinataApiKey: process.env.PINATA_KEY,
    pinataSecret: process.env.PINATA_SECRET,
    google:{
        creds:{
            type: process.env.GOOGLE_type,
            project_id: process.env.GOOGLE_project_id,
            private_key_id: process.env.GOOGLE_private_key_id,
            private_key: process.env.GOOGLE_private_key.replace(/\\n/gm, '\n'),
            client_email: process.env.GOOGLE_client_email,
            client_id: process.env.GOOGLE_client_id,
            auth_uri: process.env.GOOGLE_auth_uri,
            token_uri: process.env.GOOGLE_token_uri,
            auth_provider_x509_cert_url: process.env.GOOGLE_auth_provider_x509_cert_url,
            client_x509_cert_url : process.env.GOOGLE_client_x509_cert_url
        },
        document: process.env.SHEET_DOCUMENT,
    },
    emailAPIKey: process.env.SENDGRID_API_KEY,
    crossmintAPIKey: process.env.CROSSMINT_API_KEY,
    crossmintProjectID: process.env.CROSSMINT_PROJECT_ID,
    crossmintAPIKeyStaging: process.env.CROSSMINT_API_KEY_STAGING,
    crossmintProjectIDStaging: process.env.CROSSMINT_PROJECT_ID_STAGING,
    collectionMusureID: process.env.CROSSMINT_MUSURE_COLLECTION_ID
}