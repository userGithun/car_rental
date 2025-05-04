const BookingModel = require('../model/booking')

class BookingController {

    static carbooking = async(req,res)=>{
        try {
          const {name ,image}=req.udata
          const booking = await BookingModel.find().populate('carId')
          // console.log(booking)
    
          res.render('booking',{n:name,i:image ,book:booking ,msg:req.flash('success')})
        } catch (error) {
          console.log(error)
        }
      }

    static createBooking =async(req,res)=>{
        try {
            // console.log(req.body)
            const {fromdate,todate,message,carId}=req.body
            // console.log(req.body)
            const book = await BookingModel.create({
                fromdate,
                todate,
                message,
                carId
            })
            req.flash('success',"Car Booked. Please wait for Comfirmation :)")
            res.redirect('/booking')
            
        } catch (error) {
            console.log(error)
        }
    }

}
module.exports=BookingController