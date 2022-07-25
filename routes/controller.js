const mongo = require('mongoose');
const modelHandler = require('../models/modelHandler');
const mongodb = require('../mongo');
const bcrypt = require('bcrypt');
mongodb.connectDB();


async function getAll(req,res,next){
    try {
        let retStatus = await modelHandler.find({},{__v:0});
        res.status(200).json(retStatus);
    } catch (error) {
        next(error);
    }
}

async function getOne(req,res,next){
    try {
        let id1 = req.params.id
        let found = await modelHandler.find({"_id":id1})

        if(found.length > 0){
            res.json(found);
        }else{
            res.status(400).json({message : `Given id : ${id1} not found in database`});
        }
    } catch (error) {
        next(error);
    }
}

const createUser = async(req,res,next) => {
    try {
        let newUser = {
            name : req.body.name,
            age : req.body.age,
            company : req.body.company,
            status:req.body.status
        }
    
        if(!req.body.name || !req.body.age){
            return res.status(400).json({"message" : "Blank Name or age"})
        }else{
            let retStatus = await modelHandler.insertMany(newUser)
            res.json(retStatus)
        }
    } catch (error) {
        res.status(400).json({
            message:error.message,
            stack : process.env.NODE_ENV == 'production' ? null : error.stack 
        })
    }
};

async function updateUser(req,res,next){
    try {
        let id1 = req.params.id
        let found = await modelHandler.findById(id1);
        if(!found){
            res.status(400).json(`Given ${id1} not found in Database`)
        }else{
            let updatedDoc = await modelHandler.findByIdAndUpdate(id1,req.body,{new : true});
            res.json(updatedDoc)
        }
    } catch (error) {
        next(error);
    }
}

async function deleteUser(req,res,next){
    try {
        let id1 = req.params.id
        let found = await modelHandler.findById(id1);
        if(!found){
            res.status(400).json(`Given ${id1} not found in Database`)
        }else{
            let updatedDoc = await modelHandler.findByIdAndDelete(id1)
            res.json({
                "status" :"Deleted",
                "Doc" : updatedDoc
            })
        }
    } catch (error) {
        next(error);
    }
}

async function invalidReq(req,res){
    res.status(400).json({
        "status" : "Failed",
        "message" : "Invalid HTTP Request"
    })
}
// mongodb.disconnectDB();

module.exports = {getAll,getOne,createUser , updateUser ,deleteUser , invalidReq };


