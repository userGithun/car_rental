const ContactModel = require('../../model/contact')
const BrandModel = require('../../model/brand')
const CarModel = require('../../model/car')

class AdminController {
    static dashboard = async (req,res)=>{
        try {
            
            const TotalContact = await ContactModel.countDocuments();
            res.render('admin/dashboard',{TotalContact})
        } catch (error) {
            console.log(error)
        }
    }
    
    
    
}
module.exports=AdminController