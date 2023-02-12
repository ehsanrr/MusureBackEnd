const { GoogleSpreadsheet } = require('google-spreadsheet')
const { google } = require('../../../config/config');

async function accessSpreadsheet () {
    const doc = new GoogleSpreadsheet(google.document)
    try {
        await doc.useServiceAccountAuth(google.creds);
        await doc.loadInfo();
        return doc
    } catch (error) {
        console.error(error)
    }
}

module.exports = accessSpreadsheet