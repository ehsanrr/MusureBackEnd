const axios = require('axios').default;
const User = require('../users/model')
const NFT = require('./model');
const { logoQRMusure } = require('../../utils/constants');
const { enviromentFront, crossmintAPIKey, crossmintProjectID, collectionMusureID } = require('../../config/config');
const pinata = require('../../services/IPFS/pinataIPFS');
const fs = require('fs');
const { AwesomeQR } = require("awesome-qr");
const validatorJOI = require('../../utils/functions/Validator/validator');
const { schemaCreate, schemaRead, schemaUpdate, schemaFilterAndSort, schemaBenefitAdd, schemaBenefitEdit, schemaBenefitDelete, schemaTransfer, schemaGift} = require('./validator');

async function createNFT(req, res, next){
    
    //JOI VALIDATION
    const validator = validatorJOI( schemaCreate, req.body)
    if(validator.errors){
        return res.send({
            input: validator.errors._original,
            error: validator.errors.details
        })
    }

    const { name, lore, type, texture_1, texture_2, imageNFT, userID, price } = validator.values;

    try {
        //Starting with creation flow
        const newNFT = new NFT({
            name,
            lore,
            type,
            texture_1,
            texture_2: texture_2 || undefined,
            imageNFT,
            price: price,
            createdBy: userID
        })
        
        //CREAR QR

        const buffer = await new AwesomeQR({
            text: `${enviromentFront}/QR/${newNFT._id}`,
            size: 400,
            margin: 2,
            logoImage: logoQRMusure,
            logoScale: 0.25,
        }).draw()
        fs.writeFileSync("./src/servicesAPI/nft/QR/temporalQR.png", buffer,);
        const readableStreamForFile = fs.createReadStream('./src/servicesAPI/nft/QR/temporalQR.png');
        
        let pin = await pinata.pinFileToIPFS(readableStreamForFile)
        newNFT.QR = `https://musure.mypinata.cloud/ipfs/${pin.IpfsHash}`
        await newNFT.save()

        return res.send({
            created: newNFT,
            message: `NFT created`
        })

    } catch (error) {
        next(error)
    }
};

async function readNFT(req, res, next){
    
    //JOI VALIDATION
    const validator = validatorJOI( schemaRead, req.query)
    if(validator.errors){
        return res.send({
            input: validator.errors._original,
            error: validator.errors.details
        })
    }

    const { idNFT } = validator.values;

    try {
        const foundNFT = await NFT.findById(idNFT).populate('createdBy').exec();

        return res.send({
            nft: foundNFT || null,
            message: foundNFT ? "NFT required" : "NFT not found"
        })
        
    } catch (error) {
        next(error)
    }
};

async function readAllNFTs(req, res, next){

    try {
        const foundNFTs = await NFT.find()

        return res.send({
            AllNFTs: foundNFTs,
            message: "All NFTs required"
        })
        
    } catch (error) {
        next(error)
    }
};

async function updateNFT(req, res, next){

    //JOI VALIDATION
    const validator = validatorJOI( schemaUpdate, req.body)
    if(validator.errors){
        return res.send({
            input: validator.errors._original,
            error: validator.errors.details
        })
    }

    const { idNFT, name, lore, teaser, price } = validator.values;

    try {
        const foundNFT = await NFT.findById(idNFT)
        if(foundNFT.onSale){
            return res.send({
                updated:false,
                nft: foundNFT,
                message: 'You cannot edit a creation on sale'
            })
        }
        if(name){
            foundNFT.name = name
        }
        if(lore){
            foundNFT.lore = lore
        }
        if(teaser ){
            foundNFT.teaser = teaser
        }
        foundNFT.price = price

        await foundNFT.save()

        return res.send({
            updated: !!foundNFT,
            nft: foundNFT,
            message: foundNFT? 'NFT updated' : 'Nft not found'
        })
        
    } catch (error) {
        next(error)
    }
};

async function readNFTsFilterAndSort (req, res, next){
    //JOI VALIDATION
    const validator = validatorJOI( schemaFilterAndSort, req.query)
    if(validator.errors){
        return res.send({
            input: validator.errors._original,
            error: validator.errors.details
        })
    }

    const { userID, filterMinted, filterType, sortCreatedAt, name, page } = validator.values;

    try {
        let results;
        let creators;
        const queryMarketplace = NFT.find()
        queryMarketplace.populate('createdBy')
        if(name){
            queryMarketplace.where('name').regex(new RegExp(name, "i"))
            let creatorsRaw = await User.find().where('username').regex(new RegExp(name, "i"))
            creators = creatorsRaw.map(c=>c._id)
        }
        if(userID){
            queryMarketplace.where('createdBy').equals(userID)
        }
        if(filterMinted){
            queryMarketplace.where('minted').exists()
        }
        if(filterMinted === false){
            queryMarketplace.where('minted').exists(false)
        }
        if(filterType){
            queryMarketplace.where('type').equals(filterType)
        }
        if(sortCreatedAt){
            queryMarketplace.sort([['createdAt', sortCreatedAt]])
        }
        if(!sortCreatedAt){
            queryMarketplace.sort([['onSale', 'descending']])
        }
        if(page || page === 0){
            queryMarketplace.skip(page*12)
            queryMarketplace.limit(12)
        }

        const nftsRaw = await queryMarketplace.exec()
        //PARA AVOIDEAR LOS NFTS QUE QUEDARON SIN DUEÑO
        results = nftsRaw.filter(nft=>nft.createdBy)
        if(name){
            let queryCreatorNFTs = await NFT.find().where('createdBy').equals(creators).populate('createdBy')
            results = results.concat(queryCreatorNFTs)
            let idsPushed = []
            results = results.filter((e)=> {
                if(!idsPushed.includes(e.id)){
                    idsPushed.push(e.id)
                    return true;
                }
                else{
                    return false;
                }
            })
        }

        return res.send({
            count: results.length,
            results,
            message: 'NFTs ordered'
        })
        
    } catch (error) {
        next(error)
    }
};

async function addBenefit(req, res, next){
    
    //JOI VALIDATION
    const validator = validatorJOI( schemaBenefitAdd, req.body)
    if(validator.errors){
        return res.send({
            input: validator.errors._original,
            error: validator.errors.details
        })
    }

    const { idNFT, benefit } = validator.values;

    try {
        const foundNFT = await NFT.findById(idNFT).exec();

        foundNFT.benefits.push(benefit)
        await foundNFT.save()

        return res.send({
            nft: foundNFT ,
            message: "Benefit added"
        })
        
    } catch (error) {
        next(error)
    }
};

async function editBenefit(req, res, next){
    
    //JOI VALIDATION
    const validator = validatorJOI( schemaBenefitEdit, req.body)
    if(validator.errors){
        return res.send({
            input: validator.errors._original,
            error: validator.errors.details
        })
    }

    const { idNFT, benefit, benefitID } = validator.values;

    try {
        const foundNFT = await NFT.findById(idNFT).exec();
        let index = foundNFT.benefits.findIndex(benefit => benefit._id.toString() === benefitID.toString())
        foundNFT.benefits[index] = benefit
        await foundNFT.save()

        return res.send({
            nft: foundNFT ,
            message: "Benefit changed"
        })
        
    } catch (error) {
        next(error)
    }
};

async function deleteBenefit(req, res, next){
    
    //JOI VALIDATION
    const validator = validatorJOI( schemaBenefitDelete, req.body)
    if(validator.errors){
        return res.send({
            input: validator.errors._original,
            error: validator.errors.details
        })
    }

    const { idNFT, benefitID } = validator.values;

    try {
        const foundNFT = await NFT.findById(idNFT).exec();
        let filtered = foundNFT.benefits.filter(benefit => benefit._id.toString() !== benefitID.toString())
        foundNFT.benefits = filtered
        await foundNFT.save()

        return res.send({
            nft: foundNFT ,
            message: "Benefit deleted"
        })
        
    } catch (error) {
        next(error)
    }
};

async function changeTexturesNames(req, res, next){

    try {
        const nfts = await NFT.find();
        let original; 
        let updated;
        for (let i = 0; i < nfts.length ; i++) {
            original = nfts[i].toObject()
            updated = nfts[i]
            // need to add textureLeft, textureRight and minted to model (EVERY PROPERTY THAT I WANT TO HANDLE) to work
            if(original.textureLeft && !original.texture_1){
                updated.texture_1 = original.textureLeft
            }
            if(original.textureRight && !original.texture_2){
                updated.texture_2 = original.textureRight
            }
            if(original.texture_1 && original.textureLeft){
                updated.textureLeft = undefined
            }
            if(original.texture_2 && original.textureRight){
                updated.textureRight = undefined
            }

            await updated.save()
        }

        return res.send('changed')
        
    } catch (error) {
        next(error)
    }
};

async function deleteNFT(req, res, next){
    
    //JOI VALIDATION
    const validator = validatorJOI( schemaRead, req.body)
    if(validator.errors){
        return res.send({
            input: validator.errors._original,
            error: validator.errors.details
        })
    }

    const { idNFT } = validator.values;

    try {
        const deletedNFT = await NFT.findByIdAndDelete(idNFT);

        return res.send({
            deleted: deletedNFT,
            message: deletedNFT ? "NFT deleted" : "NFT not found"
        })
        
    } catch (error) {
        next(error)
    }
};

async function transferNFT(req, res, next){
    
    //JOI VALIDATION
    const validator = validatorJOI( schemaTransfer, req.body)
    if(validator.errors){
        return res.send({
            input: validator.errors._original,
            error: validator.errors.details
        })
    }

    const { idNFT, email } = validator.values;

    try {
        const userFound = await User.findOne({email: email})
        if(!userFound){
            return res.send({
                transfered: false,
                message: "User not found"
            })
        }
        else{
            const transferedNFT = await NFT.findByIdAndUpdate(idNFT, {
                createdBy: userFound._id
            });
            return res.send({
                transfered: transferedNFT,
                message: transferedNFT ? "NFT transfered" : "NFT not transfered"
            })
        }
        
    } catch (error) {
        next(error)
    }
};

async function giftNFT(req, res, next){
    
    //JOI VALIDATION
    const validator = validatorJOI( schemaGift, req.body)
    if(validator.errors){
        return res.send({
            input: validator.errors._original,
            error: validator.errors.details
        })
    }

    const { idNFT, receiverEmail, receiverWallet } = validator.values;

    try {
        
        const foundNFT = await NFT.findById(idNFT).populate('createdBy')
        if(receiverEmail && !receiverWallet){
            await axios({
                method: 'POST',
                url: `https://www.crossmint.io/api/2022-06-09/minting/collections/${collectionMusureID}/nfts`,
                headers:{
                    'x-client-secret': crossmintAPIKey,
                    'x-project-id': crossmintProjectID
                },
                data:{
                    metadata: {
                        name: foundNFT.name,
                        description: `        
${foundNFT.createdBy.username} x MUSURE world

Introducing the future of the Metaverse. 🌐

MUSURE world ⛩️ merging worlds with exclusive Collectible Creations from Verified Creators & Brands.

Today Physical, Digital and Augmented realities are together in the MUSURE world Ecosystem. ⚡️

Physical Creations forged are equipped with NFC Tag ⛓️🔗.

Digital Creations will always be Metaverse Wearables. 🐉

One Creation, many worlds to explore. 🔮

Collectible Creations made with love from the Metaverse. 

See the full collection: https://play.musure.world/fashioncollections

Digital Collectible terms & conditions apply, see https://www.musure.world/terms-and-conditions`,
                        image: foundNFT.videoNFT || foundNFT.imageNFT,
                    },
                    recipient: `email:${receiverEmail}:poly`
                }
            })
            return res.send({
                gifted: true,
                message: "Gift sended via email"
            })
        }
        if(receiverWallet && !receiverEmail){
            await axios({
                method: 'POST',
                url: `https://www.crossmint.io/api/2022-06-09/minting/collections/${collectionMusureID}/nfts`,
                headers:{
                    'x-client-secret': crossmintAPIKey,
                    'x-project-id': crossmintProjectID
                },
                data:{
                    metadata: {
                        name: foundNFT.name,
                        description: `        
${foundNFT.createdBy.username} x MUSURE world

Introducing the future of the Metaverse. 🌐

MUSURE world ⛩️ merging worlds with exclusive Collectible Creations from Verified Creators & Brands.

Today Physical, Digital and Augmented realities are together in the MUSURE world Ecosystem. ⚡️

Physical Creations forged are equipped with NFC Tag ⛓️🔗.

Digital Creations will always be Metaverse Wearables. 🐉

One Creation, many worlds to explore. 🔮

Collectible Creations made with love from the Metaverse. 

See the full collection: https://play.musure.world/fashioncollections

Digital Collectible terms & conditions apply, see https://www.musure.world/terms-and-conditions`,
                        image: foundNFT.videoNFT || foundNFT.imageNFT,
                    },
                    recipient: `poly:${receiverWallet}`
                }
            })
            return res.send({
                gifted: true,
                message: "Gift sended via wallet"
            })
        }
        else{
            return res.send({
                gifted: false,
                message: 'Something gone wrong'
            })
        }

    } catch (error) {
        next(error)
    }
};


module.exports = {
    createNFT,
    readNFT,
    readAllNFTs,
    readNFTsFilterAndSort,
    updateNFT,
    addBenefit,
    editBenefit,
    deleteBenefit,
    changeTexturesNames,
    deleteNFT,
    transferNFT,
    giftNFT
}