const mongoose = require('mongoose')
const local_url = 'mongodb://127.0.0.1:27017/car_rental'

const connectDB = ()=>{
    return mongoose.connect(local_url)
    .then(()=>{
        console.log('Data-base connected!')
    })
    .catch(()=>{
        console.log(error)
    })
    
}
module.exports = connectDB