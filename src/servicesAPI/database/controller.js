const accessSpreadsheet = require("../../services/GoogleSheets/spreadsheet")
const NFT = require("../nft/model")
const User = require("../users/model")

async function googleSheetUsers (req, res, next) {

    try {
        const doc = await accessSpreadsheet(res)
        const sheetCTR = doc.sheetsByTitle['USERS']

        //SETTING HEADERS SHEET
        await sheetCTR.setHeaderRow(['ID', 'Username', 'Email', 'Profile', 'Verified', 'TCsigned'])
        
        //GETTING EXISTENT USERS ON ROWS
        let rowsRaw = await sheetCTR.getRows()
        const existentUsers = rowsRaw.map(r=> r.ID)
        
        //PROCESSING USERS
        const usersRaw = await User.find()
        const allUsers = usersRaw.filter(u=> u.role !== 'admin')
        let usersToAdd = [];
        let current;
        let found;
        for (let i = 0; i < allUsers.length; i++) {
            current = allUsers[i]
            // ON TABLE
            if(existentUsers.includes(current._id.toString())){
                found = rowsRaw.find(row=>row.ID === current._id.toString())
                found.ID = current._id.toString()
                found.Username = current.username || "-"
                found.Email = current.email || "-"
                found.Profile = `https://play.musure.world/gallery/${current._id.toString()}`
                found.VERIFIED = current.isValidated
                found.TCsigned = current.termsAccepted
                await found.save()
            }
            // NOT IN THE TABLE 
            if(!existentUsers.includes(current._id.toString()) ){
                usersToAdd.push({
                    ID : current._id.toString(),
                    Username : current.username || "-",
                    Email : current.email || "-",
                    Profile : `https://play.musure.world/gallery/${current._id.toString()}`,
                    Verified : current.isValidated,
                    TCsigned : current.termsAccepted
                })
            }
        }
        await sheetCTR.addRows(usersToAdd)
            
        return res.send('DONE')
        
    } catch (error) {
        next(error)
    }
}

async function googleSheetCreations (req, res, next) {

    try {
        const doc = await accessSpreadsheet(res)
        const sheetCTR = doc.sheetsByTitle['CREATIONS']

        //SETTING HEADERS SHEET
        await sheetCTR.setHeaderRow(['ID', 'Name', 'CreationDetail', 'CreatorUsername', 'CreatorProfile', 'Price', 'Description', 'BuyLink', 'Design'])
        
        //GETTING EXISTENT USERS ON ROWS
        let rowsRaw = await sheetCTR.getRows()
        const existentCreations = rowsRaw.map(r=> r.ID)
        
        //PROCESSING USERS
        const rawCreations = await NFT.find().populate('createdBy')
        const allCreations = rawCreations.filter(nft=>nft.createdBy)
        let creationsToAdd = [];
        let current;
        let found;
        for (let i = 0; i < allCreations.length; i++) {
            current = allCreations[i]
            // ON TABLE
            if(existentCreations.includes(current._id.toString())){
                found = rowsRaw.find(row=>row.ID === current._id.toString())
                found.ID = current._id.toString()
                found.Name = current.name
                found.CreationDetail = `https://play.musure.world/detailnft/${current._id.toString()}`
                found.CreatorUsername = current.createdBy.username || '-'
                found.CreatorProfile = `https://play.musure.world/gallery/${current.createdBy._id.toString()}`
                found.Price = current.price || '-'
                found.Description = current.lore
                found.BuyLink = current.onSale || '-'
                found.Design = current.texture_1
                await found.save()
            }
            // NOT IN THE TABLE 
            if(!existentCreations.includes(current._id.toString())){
                creationsToAdd.push({
                    ID : current._id.toString(),
                    Name : current.name,
                    CreationDetail : `https://play.musure.world/detailnft/${current._id.toString()}`,
                    CreatorUsername : current.createdBy.username || '-',
                    CreatorProfile : `https://play.musure.world/gallery/${current.createdBy._id.toString()}`,
                    Price : current.price || '-',
                    Description : current.lore,
                    BuyLink : current.onSale || '-',
                    Design : current.texture_1
                })
            }
        }
        await sheetCTR.addRows(creationsToAdd)
            
        return res.send('DONE')
        
    } catch (error) {
        next(error)
    }
}

module.exports = {
    googleSheetUsers,
    googleSheetCreations
}