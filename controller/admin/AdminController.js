const ContactModel = require('../../model/contact')
const BrandModel = require('../../model/brand')
const CarModel = require('../../model/car')
const booking =require('../../model/booking')

class AdminController {
    static dashboard = async (req,res)=>{
        try {
            
            // const TotalContact = await ContactModel.countDocuments();
            const TotalBooking = await booking.countDocuments()
            const ApprovedCar = await booking.countDocuments({ status :"Approve"})
            const PendingCar = await booking.countDocuments({ status:"Pending"})
            const RejectCar = await booking.countDocuments({ status:"Reject"})
            res.render('admin/dashboard',{TotalBooking ,ApprovedCar, PendingCar ,RejectCar})
        } catch (error) {
            console.log(error)
        }
    }
    
    
    
}
module.exports=AdminController