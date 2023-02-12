const typeNFT = require ('./model');
const validatorJOI = require('../../utils/functions/Validator/validator')
const { schemaCreate, schemaDelete, schemaUpdate } = require('./validator');

async function createType(req, res, next){

    //JOI VALIDATION
    const validator = validatorJOI( schemaCreate, req.body)
    if(validator.errors){
        return res.send({
            input: validator.errors._original,
            error: validator.errors.details
        })
    }

    const { type, asset, texture1, texture2 } = validator.values;

    try {
        const newType = new typeNFT({
            type: type,
            assetBase: asset,
            textureMaster_1: texture1,
            textureMaster_2: texture2
        })
        await newType.save();
        
        return res.send({
            nftType: newType,
            message: 'NFT Type created'
        })

    } catch (error) {
        next(error)
    }
};

async function readTypes(req, res, next){

    try {
        const allTypes = await typeNFT.find().sort([['assetBase', -1]]);

        return res.send({
            allTypes: allTypes,
            message: 'All NFT types'
        })
        
    } catch (error) {
        next(error)
    }
};

async function updateTypes(req, res, next){
    
    //JOI VALIDATION
    const validator = validatorJOI( schemaUpdate, req.body)
    if(validator.errors){
        return res.send({
            input: validator.errors._original,
            error: validator.errors.details
        })
    }

    const { texture1, texture2, asset, type } = validator.values;

    try {
        const updatedType = await typeNFT.findOneAndUpdate(
            {type: type},
            {textureMaster_1: texture1, textureMaster_2: texture2, assetBase: asset},
            {new: true}
        )

        return res.send({
            typeModified: updatedType,
            message: 'NFT type updated'
        })
        
    } catch (error) {
        next(error)
    }
};

async function deleteTypes(req, res, next){

    //JOI VALIDATION
    const validator = validatorJOI( schemaDelete, req.body)
    if(validator.errors){
        return res.send({
            input: validator.errors._original,
            error: validator.errors.details
        })
    }

    const { type } = validator.values;

    try {
        const deletedType = await typeNFT.findOneAndDelete({type: type})

        return res.send({
            deleted: !!deletedType,
            message: deletedType? 'NFT type deleted': 'NFT type not found'
        })
        
    } catch (error) {
        next(error)
    }
};

module.exports = {
    createType,
    readTypes,
    updateTypes,
    deleteTypes
}