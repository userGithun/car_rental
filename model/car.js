const mongoose = require('mongoose')


const CarSchema = new mongoose.Schema({
    cname: {
        type: String,
        required: true
    },
    cbrand: {
        type: String,
        required: true
    },
    discription: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    fueltype: {
        type: String,
        required: true
    },
    modelyear: {
        type: String,
        required: true
    },
    mileage: {
        type: String,
        required: true
    },
    seatcapacity: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    condition: {
        type: String,
        required: true
    },
    transmission: {
        type: String,
        required: true
    },
    drivertype: {
        type: String,
        required: true
    },
    door: {
        type: String,
        required: true
    },
    location:{
        type: String,
        required: true
    },
    image: [
        {
            public_id: {
                type: String
            },
            url: {
                type: String
            }
        }
    ],
    AC: {
        type: String,
        default:"false"
    },
    PS: {
        type: String,
        default:"false"
    },
    cdplayer: {
        type: String,
        default:"false"
    },
    PDL: {
        type: String,
        default:"false"
    },
    airbagD: {
        type: String,
        default:"false"
    },
    CL: {
        type: String,
        default:"false"
    },
    ABT: {
        type: String,
        default:"false"
    },
    airbagP: {
        type: String,
        default:"false"
    },
    CS: {
        type: String,
        default:"false"
    },
    PW: {
        type: String,
        default:"false"
    },
    BA: {
        type: String,
        default:"false"
    },
    LS: {
        type: String,
        default:"false"
    }

}, { timestamps: true })

const CarModel = new mongoose.model('AddCar', CarSchema)
module.exports = CarModel