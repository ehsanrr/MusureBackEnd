//VARIABLES
const minLengthTexts = 3;
const maxLengthNames = 20;
const maxLengthUsername = 20;
const maxLengthBenefitOverview = 60;
const maxLengthTextAreas = 280;
const maxLengthFeedback = 1000;
const logoQRMusure = "https://musure.mypinata.cloud/ipfs/Qmb9NQpu6S246j17kFiB6cRjfuqz45tR28RzQcWTRYfzvM"

//REGEX
const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const regexIPFS = /^https:\/\/musure.mypinata.cloud\/ipfs\/.*/
const regexTime = /^([0-1][0-9]|[2][0-3]):([0-5][0-9])$/
const regexDate = /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/
const regexTimezone = /^-?([0-1][0-9]|[2][0-3]):([0-5][0-9])$/
const regexMongoID = /^[a-f\d]{24}$/i
const regexWallet = /^0x[a-fA-F0-9]{40}$/

//ARRAYS
const NFTS_TYPES = ['Wing', 'Vehicle', 'Sneaker', 'Skin', 'Pet', 'Graffiti', 'Dance', 'Bazooka', 'Airforce']
const typesPrecharge = [
    {
        type: 'Sneaker',
        assetBase: 'https://musure.mypinata.cloud/ipfs/QmZUv7eG1tssDnKDbr1w6ZxFdc7nEUKL3Qx1nMMtvV6nSp',
        textureMaster_1: "https://musure.mypinata.cloud/ipfs/QmTnMFQEzfujwz9775Yg8Lc2nenAKjETqDU4gBQMmzSQeB",
        textureMaster_2: "https://musure.mypinata.cloud/ipfs/QmcRUE68mPH9pjWDYAag5gZz1Db1T7bAwaKKBuKawRMSts"
    },
    {
        type: 'Head'
    },
    {
        type: 'Aura'
    },
    {
        type: 'Skin'
    },
    {
        type: 'Wing'
    },
    {
        type: 'Bazooka'
    },
    {
        type: 'Pet'
    },
    {
        type: 'Vehicle'
    },
    {
        type: 'Dance'
    },
    {
        type: 'Graffiti'
    },
]

module.exports = {
    minLengthTexts,
    maxLengthNames,
    maxLengthUsername,
    maxLengthTextAreas,
    maxLengthFeedback,
    logoQRMusure,
    regexEmail,
    regexIPFS,
    regexTime,
    regexDate,
    regexTimezone,
    regexMongoID,
    regexWallet,
    NFTS_TYPES,
    typesPrecharge,
    maxLengthBenefitOverview
}