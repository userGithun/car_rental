const BrandModel = require("../../model/brand");
const cloudinary = require("cloudinary");

// Configuration
cloudinary.config({
  cloud_name: "ddblbrvxl",
  api_key: "674549153778279",
  api_secret: "tdXOWN_-uNiQUxj8Emqd8KvJcUA",
});

class BrandController {

  static brandcreate = async (req,res)=>{
    try {
        const brand = await BrandModel.find()
        res.render('admin/brand',{ b:brand ,msg:req.flash('success'),msg1:req.flash('success'),msg2:req.flash('error')})
    } catch (error) {
        console.log(error)
    }
}

  static brandInsert = async (req, res) => {
    try {
      // console.log(req.body)

      const { brand } = req.body;

      const file = req.files.image;
      const imageupload = await cloudinary.uploader.upload(
        file.tempFilePath, 
        {
        folder: "car_rent",
        }
    );
      await BrandModel.create({
        brand,
        image:{
            public_id: imageupload.public_id,
            url: imageupload.secure_url
        }
      });
      req.flash("success", "Brand Created !");
      res.redirect("/admin/brand");
    } catch (error) {
      console.log(error);
    }
  };
  static brand_delete = async (req, res) => {
    try {
      const id = req.params.id;
      await BrandModel.findByIdAndDelete(id);
      req.flash("error", "Brand Deleted Success!");
      res.redirect("/admin/brand");
    } catch (error) {
      console.log(error);
    }
  };
  static brand_edit = async (req, res) => {
    try {
      const id = req.params.id;
      const brand = await BrandModel.findById(id);
      res.render("admin/brandedit", { b: brand });
    } catch (error) {
      console.log(error);
    }
  };
  static brand_update = async (req, res) => {
    try {
      // console.log(req.body)
      const id = req.params.id;
      const { brand } = req.body;
      await BrandModel.findByIdAndUpdate(id, {
        brand,
      });
      req.flash("success", "Brand Name Updated !");
      res.redirect("/admin/brand");
    } catch (error) {
      console.log(error);
    }
  };
}
module.exports = BrandController;
