const mongo = require('mongoose');
const modelHandler = require('../models/modelHandler');
const mongodb = require('../mongo');
const bcrypt = require('bcrypt');
mongodb.connectDB();


async function getAll(req,res,next){
    try {
        let retStatus = await modelHandler.find({},{__v:0});
        res.clearCookie("name");
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
            let err = new Error(`Given id : ${id1} not found in database`);
            throw err;
        }
    } catch (error) {
        next(error);
    }
};

const createUser = async(req,res,next) => {
    try {
        let newUser = {
            name : req.body.name,
            age : req.body.age,
            company : req.body.company,
            status:req.body.status
        }
    
        if(!req.body.name || !req.body.age){
            let err = new Error("Blank Name or age");
            throw err;
        }else{
            let dup_user = await modelHandler.find({"name":newUser.name});
            if(dup_user.length > 0){
                let err = new Error();
                err.message = `User ${newUser.name} already exists`;
                err.status = 400;
                throw err;
            }
            else{
                let retStatus = await modelHandler.insertMany(newUser);
                res.json(retStatus);
            }
        }
    } catch (error) {
        next(error);
    }
};

async function updateUser(req,res,next){
    try {
        let id1 = req.params.id
        let found = await modelHandler.findById(id1);
        if(!found){
            let err = new Error(`Given id : ${id1} not found in database`);
            throw err;
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
            let err = new Error(`Given id : ${id1} not found in database`);
            throw err;
        }else{
            let updatedDoc = await modelHandler.findByIdAndDelete(id1);
            console.log(updatedDoc);
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


