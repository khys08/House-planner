const mongoose = require('mongoose')
const { buffer } = require('stream/consumers')

const Schema = mongoose.Schema

const ArchHomeModel = mongoose.Schema({

    Building:{
        type:String,
        required:true
    },

    Area:{
        type:Number,
        required:true
    },

    BedRoom:{
        type:Number,
        required:true
        
    },
    DiningRoom:{
        type:Number,
        required:true
    },
    Kitchen:{
        type:Number,
        required:true
    },
    HouseImage:{
        data:buffer,
        contentType:String,
    }


})

const HomeData = mongoose.model('HomeData', ArchHomeModel);
module.exports = HomeData;