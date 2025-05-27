const mongoose = require('mongoose')

const BookingScheme = new mongoose.Schema({
    fromdate: {
        type: String,
        required: true
    },
    todate: {
        type: String,
        required: true
    },
    message: {
        type: String,
    },
    //Hidden input
    carId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AddCar'  // reference to Car model
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    //Hidden input
    status: {
        type: String,
        enum: ["Pending", "InProgress", "Approved", "Rejected"],
        default: 'Pending'
    },
    // userId: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "user",      // reference to user model
    //     required: true
    // }

}, { timestamps: true })
const BookingModel = new mongoose.model('Booking', BookingScheme)
module.exports = BookingModel