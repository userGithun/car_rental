const mongoose = require('mongoose')


const CarSchema =new mongoose.Schema({
    cname:{
        type:String,
        required:true
    },
    cbrand:{
        type:String,
        required:true
    },
    discription:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    fueltype:{
        type:String,
        required:true
    },
    modelyear:{
        type:String,
        required:true
    },
    seatcapacity:{
        type:String,
        required:true
    },
    AC:{
        type:String,
    },
    PS:{
        type:String,
    },
    cdplayer:{
        type:String,
    },
    PDL:{
        type:String,
    },
    airbagD:{
        type:String,
    },
    CL:{
        type:String,
    },
    ABT:{
        type:String,
    },
    airbagP:{
        type:String,
    },
    CS:{
        type:String,
    },
    PW:{
        type:String,
    },
    BA:{
        type:String,
    },
    LS:{
        type:String
    }

},{timestamps:true})

const CarModel =new mongoose.model('AddCar',CarSchema) 
module.exports= CarModel