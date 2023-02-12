const User = require('./model')
const NFT = require('../nft/model')
const validatorJOI = require('../../utils/functions/Validator/validator');
const { schemaUpdate, schemaCreate, schemaID, schemaCheck } = require('./validator');
const sendEmailWelcome = require('../../services/Mailing/welcome');

async function createUser (req, res, next){

    //JOI VALIDATION
    const validator = validatorJOI( schemaCreate, req.body)
    if(validator.errors){
        return res.send({
            input: validator.errors._original,
            error: validator.errors.details
        })
    }

    const { email, firebaseID } = validator.values;

    try {
        //VALIDATE IF EXIST AN USER WITH SAME FIREBASE ID
        const userFound = await User.findOne({firebaseID: firebaseID, email: email})
        if(userFound){
            return res.status(200).send({
                user: userFound,
                message: 'User Found'
            })
        }
        else{
            //CREATE NEW USER
            const newUser = new User({ firebaseID: firebaseID, email: email })
            const userCreated = await newUser.save()
            await sendEmailWelcome(email)
            return res.status(201).send({
                user: userCreated,
                message: 'User created'
            })
        }

    } catch (error) {
        next(error)
    }
};

async function readUser (req, res, next){

    //JOI VALIDATION
    const validator = validatorJOI( schemaID, req.query)
    if(validator.errors){
        return res.send({
            input: validator.errors._original,
            error: validator.errors.details
        })
    }

    const { userID } = validator.values;

    try {

        const userFound = await User.findById(userID)
        return res.send(userFound)

    } catch (error) {
        next(error)
    }
};

async function updateUser (req, res, next){
    
    //JOI VALIDATION
    const validator = validatorJOI( schemaUpdate, req.body)
    if(validator.errors){
        return res.send({
            input: validator.errors._original,
            error: validator.errors.details
        })
    }

    const { userID, wallet, username, bio, image, twitter, instagram, tiktok, banner, termsAccepted} = validator.values;

    try {
        //FIND USER
        const userToUpdate = await User.findById(userID)
        if(!userToUpdate){
            return res.send({
                updated: false,
                message: 'There is not a User with that id'
            })
        }

        //CHECKEOS Y UPDATES
        const errors = {}
        const inputsSearch = ['username', 'twitter', 'instagram', 'tiktok', 'wallet'];
        let search;
        let propertySearch;
        for (let j = 0; j < inputsSearch.length; j++) {
            propertySearch = inputsSearch[j]
            if(validator.values[propertySearch]){
                search = await User.find().where(propertySearch).equals(validator.values[propertySearch]).where('_id').ne(userID).exec()
                if(search.length !== 0){
                    errors[propertySearch] = `That ${propertySearch} is already on use`
                }
            }
        }
        if(bio){
            userToUpdate.bio = bio
        }
        if(bio === 'empty'){
            userToUpdate.bio = null
        }
        if(image){
            userToUpdate.image = image
        }
        if(banner){
            userToUpdate.banner = banner
        }
        if(!errors.username && username){
            userToUpdate.username = username
        }
        if(!errors.username && username === 'empty'){
            userToUpdate.username = null
        }
        if(!errors.twitter && twitter){
            userToUpdate.twitter = twitter;
        }
        if(!errors.twitter && twitter === 'empty'){
            userToUpdate.twitter = null
        }
        if(!errors.instagram && instagram){
            userToUpdate.instagram = instagram;
        }
        if(!errors.instagram && instagram === 'empty'){
            userToUpdate.instagram = null
        }
        if(!errors.tiktok && tiktok){
            userToUpdate.tiktok = tiktok
        }
        if(!errors.tiktok && tiktok === 'empty'){
            userToUpdate.tiktok = null
        }
        if(!errors.wallet && wallet){
            userToUpdate.wallet = wallet;
        }
        if(termsAccepted){
            userToUpdate.termsAccepted = termsAccepted;
        }
        const userUpdated = await userToUpdate.save()
        
        return res.send({
            user: userUpdated,
            errors: errors,
            message: "User updated"
        })

    } catch (error) {
        next(error)
    }
};

async function readAllUsers (req, res, next){

    try {
        
        const allUsers = await User.find()

        return res.send(allUsers)

    } catch (error) {
        next(error)
    }
};

async function checkValue (req, res, next){
    //JOI VALIDATION
    const validator = validatorJOI( schemaCheck, req.query)
    if(validator.errors){
        return res.send({
            input: validator.errors._original,
            error: validator.errors.details
        })
    }
    
    const { userID, property, value } = validator.values;
    
    try {
        let search = await User.find().where(property).equals(value).where('_id').ne(userID).exec()

        return res.send({
            available: search.length === 0,
            message: search.length === 0? 'Value available' : 'Value not available'
        })
        

    } catch (error) {
        next(error)
    }
};

async function changeID(req, res, next){

    try {
        const users = await User.find();
        let original;
        let toUpdate;

        for (let i = 0; i < users.length; i++) {
            toUpdate = users[i]
            original = Object.values(toUpdate)[2]
            if(original.id && !original.firebaseID){
                toUpdate.firebaseID = original.id
            }
            // need to add EVERY PROPERTY THAT I WANT TO HANDLE to work id for example
            if(original.firebaseID && original.id){
                toUpdate.id = undefined
            }
            await toUpdate.save()
        }

        return res.send('changed')
        
    } catch (error) {
        next(error)
    }
};

async function addProperty(req, res, next){

    try {
        const users = await User.find();
        let toUpdate;
        for (let i = 0; i < users.length; i++) {
            toUpdate = users[i]
            toUpdate.role = 'user'
            await toUpdate.save()
        }

        return res.send('changed')
        
    } catch (error) {
        next(error)
    }
};

module.exports={
    createUser,
    readUser,
    updateUser,
    readAllUsers,
    checkValue,
    changeID,
    addProperty
}