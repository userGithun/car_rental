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
    carId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AddCar'  // reference to Car model
    },
    status: {
        type: String,
        default: 'Pending'
    }

}, { timestamps: true })
const BookingModel = new mongoose.model('Booking', BookingScheme)
module.exports = BookingModel