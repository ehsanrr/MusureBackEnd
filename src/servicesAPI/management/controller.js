const typeNFT = require('../nftTypes/model')
const { typesPrecharge } = require('../../utils/constants');

async function chargeAllFields (req, res, next) {

    try {
        for (let i = 0; i < typesPrecharge.length; i++) {
            const newType = new typeNFT({
                type: typesPrecharge[i].type,
                assetBase: typesPrecharge[i].assetBase,
                textureMaster_1: typesPrecharge[i].textureMaster_1,
                textureMaster_2: typesPrecharge[i].textureMaster_2
            })
            await newType.save()
        }

        return res.send('Precharge DONE')
        
    } catch (error) {
        next(error)
    }
}

// async function googleSheetCreators (req, res, next) {

//     try {
//         const doc = await accessSpreadsheet()
//         const sheetCTR = doc.sheetsByTitle['CREATORS']

//         //SETTING HEADERS SHEET
//         await sheetCTR.setHeaderRow(['ID', 'WALLET', 'USERNAME', 'TWITTER', 'TWITTER_FOLLOWERS', 'INSTAGRAM', 'EMAIL', 'IMAGE', 'VALIDATED', `${enviromentBack}/management/sheetCreator`, 'MANUAL_VALIDATE',])
        
//         //GETTING EXISTENT USERS ON ROWS
//         let rowsRaw = await sheetCTR.getRows()
//         const existentUsers = rowsRaw.map(r=> r.ID)
        
//         //PROCESSING USERS
//         const allUsers = await User.find()
//         let usersToAdd = [];
//         let current;
//         let found;
//         for (let i = 0; i < allUsers.length; i++) {
//             current = allUsers[i]
//             // ON TABLE NOT VALIDATED
//             if(existentUsers.includes(current._id.toString()) && !current.isValidated){
//                 found = rowsRaw.find(row=>row.ID === current._id.toString())
//                 found.ID = current._id.toString()
//                 found.WALLET = current.wallet
//                 found.USERNAME = current.username || "-"
//                 found.TWITTER = current.twitter || "-"
//                 found.TWITTER_FOLLOWERS = current.twitterFollowers || "-"
//                 found.INSTAGRAM = current.instagram && `https://www.instagram.com/${current.instagram}/?__a=1` || "-"
//                 found.EMAIL = current.email || "-"
//                 found.IMAGE = current.image || "-"
//                 found.VALIDATED = current.isValidated
//                 await found.save()
//             }
//             // ON TABLE VALIDATED
//             if(existentUsers.includes(current._id.toString()) && current.isValidated){
//                 found = rowsRaw.find(row=>row.ID === current._id.toString())
//                 await found.delete()
//             }
//             // NOT IN THE TABLE AND NOT VALIDATED
//             if(!existentUsers.includes(current._id.toString()) && !current.isValidated){
//                 usersToAdd.push({
//                     ID: current._id.toString(),
//                     WALLET: current.wallet,
//                     USERNAME: current.username || "-",
//                     TWITTER: current.twitter || "-",
//                     TWITTER_FOLLOWERS: current.twitterFollowers || "-",
//                     INSTAGRAM: current.instagram && `https://www.instagram.com/${current.instagram}/?__a=1` || "-",
//                     EMAIL: current.email || "-",
//                     IMAGE: current.image || "-",
//                     VALIDATED: current.isValidated,
//                 })
//             }
//             // NOT IN THE TABLE AND VALIDATED
//             else{
//                 continue;
//             }
//         }
//         await sheetCTR.addRows(usersToAdd)
            
//         return res.send('DONE')
        
//     } catch (error) {
//         next(error)
//     }
// }

// async function googleSheetOrderDesigns (req, res, next) {

//     try {
//         const doc = await accessSpreadsheet()
        
//         const sheetDO = doc.sheetsByTitle['DESIGN ORDERS']
        
//         //SETTING HEADERS SHEET
//         await sheetDO.setHeaderRow(['ID', 'CREATOR', 'COLOR_PRIMARY', 'COLOR_SECONDARY', 'COLOR_DETAIL', 'LOGO', 'NAME', 'LORE', 'STYLE', 'PHRASE', 'INSPIRATION', 'EMAIL', 'DONE', `${enviromentBack}/management/sheetDesign`, 'DONE_MANUAL'])
        
//         //GETTING EXISTENT ORDER DESIGN ON ROWS
//         let rowsRaw = await sheetDO.getRows()
//         const existentOrders = rowsRaw.map(r=> r.ID)
        
//         //PROCESSING ORDERS DESIGN
//         const allDesignOrders = await DesignOrder.find().populate('requester').sort([['createdAt', 'ascending']]);
//         const designOrdersValidated = allDesignOrders.filter(e=>e.requester.isValidated)
//         let ordersToAdd = [];
//         let current;
//         let found;
//         for (let i = 0; i < designOrdersValidated.length; i++) {
//             current = designOrdersValidated[i]
//             // ON TABLE NOT DONE
//             if(existentOrders.includes(current._id.toString()) && !current.done){
//                 found = rowsRaw.find(row=>row.ID === current._id.toString())
//                 found.ID = current._id,
//                 found.CREATOR = current.requester.username,
//                 found.COLOR_PRIMARY = current.colorPrimary,
//                 found.COLOR_SECONDARY = current.colorSecondary,
//                 found.COLOR_DETAIL = current.colorDetails,
//                 found.LOGO = current.logo,
//                 found.NAME = current.name,
//                 found.LORE = current.lore,
//                 found.STYLE = current.style.join(', '),
//                 found.PHRASE = current.phrase || "-",
//                 found.INSPIRATION = current.inspirationImages? current.inspirationImages.join(' - ') : "-",
//                 found.EMAIL = current.requester.email || "-",
//                 found.DONE = current.done,
//                 await found.save()
//             }
//             // ON TABLE DONE
//             if(existentOrders.includes(current._id.toString()) && current.done){
//                 found = rowsRaw.find(row=>row.ID === current._id.toString())
//                 await found.delete()
//             }
//             // NOT IN THE TABLE AND NOT DONE
//             if(!existentOrders.includes(current._id.toString()) && !current.done){
//                 ordersToAdd.push({
//                     ID: current._id.toString(),
//                     CREATOR: current.requester.username,
//                     COLOR_PRIMARY: current.colorPrimary,
//                     COLOR_SECONDARY: current.colorSecondary,
//                     COLOR_DETAIL: current.colorDetails,
//                     LOGO: current.logo,
//                     NAME: current.name,
//                     LORE: current.lore,
//                     STYLE: current.style.join(', '),
//                     PHRASE: current.phrase || "-",
//                     INSPIRATION: current.inspirationImages? current.inspirationImages.join(' - ') : "-",
//                     EMAIL: current.requester.email || "-",
//                     DONE: current.done,
//                 })
//             }
//             // NOT IN THE TABLE AND DONE
//             else{
//                 continue;
//             }
//         }
//         await sheetDO.addRows(ordersToAdd)
            
//         return res.send('DONE')
        
//     } catch (error) {
//         next(error)
//     }
// }

// async function googleSheetOrderTeaser (req, res, next) {

//     try {
//         const doc = await accessSpreadsheet()
        
//         const sheetTO = doc.sheetsByTitle['TEASER ORDERS']
        
//         //SETTING HEADERS SHEET
//         await sheetTO.setHeaderRow(['ID', 'IDNFT', 'TEXTURE_LEFT', 'TEXTURE_RIGHT', 'REQUESTER', 'EMAIL', 'DONE', `${enviromentBack}/management/sheetTeaser`, 'DONE_MANUAL', 'CID'])
        
//         //GETTING EXISTENT ORDERS TEASER ON ROWS
//         let rowsRaw = await sheetTO.getRows()
//         const existentOrders = rowsRaw.map(r=> r.ID)
        
//         //PROCESSING ORDER TEASERS
//         const allTeaserOrders = await TeaserOrder.find().populate('requester').sort([['createdAt', 'ascending']]);
//         const teaserOrdersValidated = allTeaserOrders.filter(e=>e.requester.isValidated)
//         let ordersToAdd = [];
//         let current;
//         let found;
//         for (let i = 0; i < teaserOrdersValidated.length; i++) {
//             current = teaserOrdersValidated[i]
//             // ON TABLE NOT DONE
//             if(existentOrders.includes(current._id.toString()) && !current.done){
//                 found = rowsRaw.find(row=>row.ID === current._id.toString())
//                 found.ID = current._id,
//                 found.IDNFT = current.idNFT,
//                 found.REQUESTER = current.requester.username || "-",
//                 found.EMAIL = current.requester.email || "-",
//                 found.DONE = current.done,
//                 await found.save()
//             }
//             // ON TABLE DONE
//             if(existentOrders.includes(current._id.toString()) && current.done){
//                 found = rowsRaw.find(row=>row.ID === current._id.toString())
//                 await found.delete()
//             }
//             // NOT IN THE TABLE AND NOT DONE
//             if(!existentOrders.includes(current._id.toString()) && !current.done){
//                 const foundNFT = await NFT.findOne({idNFT: current.idNFT})
//                 ordersToAdd.push({
//                     ID: current._id.toString(),
//                     IDNFT: current.idNFT,
//                     TEXTURE_LEFT: foundNFT.textureLeft,
//                     TEXTURE_RIGHT: foundNFT.textureRight,
//                     REQUESTER: current.requester.username || "-",
//                     EMAIL: current.requester.email || "-",
//                     DONE: current.done,
//                 })
//             }
//             // NOT IN THE TABLE AND DONE
//             else{
//                 continue;
//             }
//         }
//         await sheetTO.addRows(ordersToAdd)
            
//         return res.send('DONE')
        
//     } catch (error) {
//         next(error)
//     }
// }

// async function googleSheetNFTS (req, res, next) {

//     try {
//         const doc = await accessSpreadsheet()
        
//         const sheetNFT = doc.sheetsByTitle['PREMINTEOS VERIFICADOS']
        
//         //SETTING HEADERS SHEET
//         await sheetNFT.setHeaderRow(['ID', 'NAME', 'LORE', 'IMAGE', 'TEXTURE_LEFT', 'TEXTURE_RIGHT', 'EMAIL', 'CREATED_BY', 'TEASER', 'MINTED', `${enviromentBack}/management/sheetNFT`, 'URL_OPENSEA'])
        
//         //GETTING EXISTENT NFTS ON ROWS
//         let rowsRaw = await sheetNFT.getRows()
//         const existentNFTs = rowsRaw.map(r=> r.ID)
        
//         //FILTERING NFTS WITH SAME IDNFT
//         const rawNFTs = await NFT.find().populate('createdBy').sort([['createdAt', 'ascending']]);
        
//         //PROCESSING NFTS
//         let NFTsToAdd = [];
//         let current;
//         let found;
//         for (let i = 0; i < rawNFTs.length; i++) {
//             current = rawNFTs[i]
//             // ON TABLE NOT MINTED
//             if(existentNFTs.includes(current._id) && !current.minted){
//                 found = rowsRaw.find(row=>row.ID === current._id)
//                 found.ID = current._id,
//                 found.NAME = current.name,
//                 found.LORE = current.lore,
//                 found.IMAGE = current.imageNFT,
//                 found.TEXTURE_LEFT = current.textureLeft,
//                 found.TEXTURE_RIGHT = current.textureRight,
//                 found.EMAIL = current.owner.email || "-",
//                 found.CREATED_BY = current.createdBy.username? current.createdBy.username : current.createdBy.email,
//                 found.TEASER = current.teaser || "-",
//                 found.MINTED = current.minted,
//                 await found.save();
//             }
//             // ON TABLE MINTED
//             if(existentNFTs.includes(current._id) && current.minted){
//                 found = rowsRaw.find(row=>row.ID === current._id)
//                 await found.delete()
//             }
//             // NOT IN THE TABLE AND NOT MINTED
//             if(!existentNFTs.includes(current._id) && !current.minted){
//                 NFTsToAdd.push({
//                     ID: current._id,
//                     NAME: current.name,
//                     LORE: current.lore,
//                     IMAGE: current.imageNFT,
//                     TEXTURE_LEFT: current.textureLeft,
//                     TEXTURE_RIGHT: current.textureRight,
//                     EMAIL: current.owner.email || "-",
//                     CREATED_BY: current.createdBy.username? current.createdBy.username : current.createdBy.wallet,
//                     TEASER: current.teaser || "-",
//                     MINTED: current.minted,
//                 })
//             }
//             // NOT IN THE TABLE AND MINTED
//             else{
//                continue;
//             }
//         }
//         await sheetNFT.addRows(NFTsToAdd)
            
//         return res.send('DONE')
        
//     } catch (error) {
//         next(error)
//     }
// }

module.exports = {
    chargeAllFields,
    // googleSheetCreators,
    // googleSheetOrderDesigns,
    // googleSheetOrderTeaser,
    // googleSheetNFTS
}