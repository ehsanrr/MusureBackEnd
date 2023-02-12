const { GoogleSpreadsheet } = require('google-spreadsheet')
const { google } = require('../../config/config');

async function accessSpreadsheet (res) {
    const doc = new GoogleSpreadsheet(google.document)
    try {
        await doc.useServiceAccountAuth(google.creds);
        await doc.loadInfo();
        return doc
    } catch (error) {
        return res.send(error)
    }
}

module.exports = accessSpreadsheet