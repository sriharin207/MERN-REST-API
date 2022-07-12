const mongoose = require('mongoose')

const modelHandler = new mongoose.Schema({
    name :{
        type : String,
        required : true
    },
    age : {
        type : Number,
        required : true
    },
    company : {
        type : String,
        required : true
    },
    status : {
        type : String,
        required : true
    }
},{timestamps :true})

module.exports = mongoose.model("demoInventory",modelHandler);
