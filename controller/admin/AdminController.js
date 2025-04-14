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
    static addcar = async (req,res)=>{
        try {
            const brand =await BrandModel.find()
            const car = await CarModel.find()

            res.render('admin/addcar',{brand:brand,car:car ,msg:req.flash('success'),msg1:req.flash('error')})
        } catch (error) {
            console.log(error)
        }
    }
    static brandcreate = async (req,res)=>{
        try {
            const brand = await BrandModel.find()
            res.render('admin/brand',{ b:brand ,msg:req.flash('success'),msg1:req.flash('success'),msg2:req.flash('error')})
        } catch (error) {
            console.log(error)
        }
    }
}
module.exports=AdminController