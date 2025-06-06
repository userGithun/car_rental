const CarModel = require('../../model/car')
const BrandModel = require('../../model/brand')
const cloudinary = require('cloudinary')

// Configuration
cloudinary.config({
    cloud_name: "ddblbrvxl",
    api_key: "674549153778279",
    api_secret: "tdXOWN_-uNiQUxj8Emqd8KvJcUA",
});

class CarController {
    static addcar = async (req, res) => {
        try {
            const brand = await BrandModel.find()
            const car = await CarModel.find()

            res.render('admin/addcar', { brand: brand, car: car, msg: req.flash('success'), msg1: req.flash('error') })
        } catch (error) {
            console.log(error)
        }
    }
    static carInsert = async (req, res) => {
        try {
            // console.log(req.body)
            const { cname, cbrand, discription, price, fueltype, modelyear, mileage, seatcapacity, color, condition, transmission, drivertype,
                door, location, AC, PS, cdplayer, PDL, airbagD, CL, ABT, airbagP, CS, PW, BA, LS } = req.body

            // 5 images upload to Cloudinary
            const imageFields = ['image1', 'image2', 'image3', 'image4', 'image5'];
            const imageupload = [];

            for (let image of imageFields) {
                if (req.files[image]) {
                    const multiupload = await cloudinary.uploader.upload(
                        req.files[image].tempFilePath,
                        { folder: 'carphoto' }
                    );
                    imageupload.push({
                        public_id: multiupload.public_id,
                        url: multiupload.secure_url
                    });
                }
            }
            // console.log(imageupload)

            const car = await CarModel.create({
                cname,
                cbrand,
                discription,
                price,
                fueltype,
                modelyear,
                seatcapacity,
                mileage,
                image: imageupload,
                color,
                condition,
                transmission,
                drivertype,
                door,
                location,
                AC,
                PS,
                cdplayer,
                PDL,
                airbagD,
                CL,
                ABT,
                airbagP,
                CS,
                PW,
                BA,
                LS,
            })
            req.flash('success', 'New CarDetail Added !')
            res.redirect('/admin/addcar')
        } catch (error) {
            console.log(error)
        }
    }
    static deleteCarDetail = async (req, res) => {
        try {
            const id = req.params.id
            const car = await CarModel.findByIdAndDelete(id)
            req.flash('error', 'Car Detail Deleted !')

            res.redirect('/admin/addcar')
        } catch (error) {
            confirm.log(error)
        }
    }
    static editcar = async (req, res) => {
        try {
            const id = req.params.id
            const brand = await BrandModel.find()
            const car = await CarModel.findById(id)
            res.render('admin/editcardetail', { c: car, brand: brand })
        } catch (error) {
            console.log(error)
        }
    }
    static carUpdateInsert = async (req, res) => {
        try {
            // console.log(req.body)
            const id = req.params.id
            const { cname, cbrand, discription, price, fueltype, modelyear, mileage, seatcapacity, color, condition, transmission, drivertype,
                door, location} = req.body

            // Handle checkboxes: If not present in req.body, set as "false"
            const checkboxFields = ['AC', 'PS', 'cdplayer', 'PDL', 'airbagD', 'CL', 'ABT', 'airbagP', 'CS', 'PW', 'BA', 'LS'];
            checkboxFields.forEach(field => {
                if (!req.body[field]) req.body[field] = "false";
                else req.body[field] = "true";  // Optional: force it as string
            });

            await CarModel.findByIdAndUpdate(id, {
                cname,
                cbrand,
                discription,
                price,
                fueltype,
                modelyear,
                mileage,
                seatcapacity,
                color,
                condition,
                transmission,
                drivertype,
                door,
                location,
                AC: req.body.AC,
                PS: req.body.PS,
                cdplayer: req.body.cdplayer,
                PDL: req.body.PDL,
                airbagD: req.body.airbagD,
                CL: req.body.CL,
                ABT: req.body.ABT,
                airbagP: req.body.airbagP,
                CS: req.body.CS,
                PW: req.body.PW,
                BA: req.body.BA,
                LS: req.body.LS,
            });
            req.flash('success', 'Car Details Updated!')
            res.redirect('/admin/addcar')
        } catch (error) {
            console.log(error)
        }
    }
}
module.exports = CarController