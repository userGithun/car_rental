const BookingModel = require('../../model/booking')


class InventoryController {
    static inventory = async(req,res)=>{
        try {
            const Booking = await BookingModel.find().populate('carId')
            res.render('admin/inventory',{b:Booking ,approve:req.flash('approve')})
        } catch (error) {
            console.log(error)
        }
    }
    static bookingStatus =async(req,res)=>{
        try {
            // console.log(req.body)
            const id = req.params.id;
            const {status}=req.body
            await BookingModel.findByIdAndUpdate(id,{
                status,
            })
            req.flash('approve',"Car Booking Status Updated :)")
            return res.redirect('/admin/inventory')
        } catch (error) {
            console.log(error)
        }
    }
}
module.exports=InventoryController