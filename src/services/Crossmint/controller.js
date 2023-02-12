const { crossmintAPIKey, crossmintProjectID, collectionMusureID } = require("../../config/config")
const NFT = require('../../servicesAPI/nft/model')
const buyNotification = require("../Mailing/buyNotification")

const axios = require("axios").default

async function webhookController (req, res, next){
    
    const {userEmail, quantity, clientId, userWallet, userSession} = req.body
    const creationID = clientId.split('-')[2]
    
    try {
        let creation = await NFT.findById(creationID).populate('createdBy')
        creation.onSale = false
        await creation.save()
        
        for (let i = 0; i < quantity; i++) {
            await axios({
                method: 'POST',
                url: `https://www.crossmint.io/api/2022-06-09/minting/collections/${collectionMusureID}/nfts`,
                headers:{
                    'x-client-secret': crossmintAPIKey,
                    'x-project-id': crossmintProjectID
                },
                data:{
                    metadata: {
                        name: creation.name,
                        description: `        
${creation.createdBy.username} x MUSURE world

Introducing the future of the Metaverse. 🌐

MUSURE world ⛩️ merging worlds with exclusive Collectible Creations from Verified Creators & Brands.

Today Physical, Digital and Augmented realities are together in the MUSURE world Ecosystem. ⚡️

Physical Creations forged are equipped with NFC Tag ⛓️🔗.

Digital Creations will always be Metaverse Wearables. 🐉

One Creation, many worlds to explore. 🔮

Collectible Creations made with love from the Metaverse. 

See the full collection: https://play.musure.world/fashioncollections

Digital Collectible terms & conditions apply, see https://www.musure.world/terms-and-conditions`,
                        image: creation.videoNFT || creation.imageNFT,
                    },
                    recipient: `email:${userEmail}:poly`
                }
            })
            
        }
        await buyNotification(creation, userEmail)
    
        return res.send('received')

    } catch (error) {
        next(error)
    }
};

module.exports={
    webhookController
}