const ContactModel = require("../model/contact");
const UserModel = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cloudinary = require("cloudinary");
const BrandModel = require('../model/brand')
const CarModel = require('../model/car')


// Configuration
cloudinary.config({
  cloud_name: "ddblbrvxl",
  api_key: "674549153778279",
  api_secret: "tdXOWN_-uNiQUxj8Emqd8KvJcUA",
});

class FrontController {
  static home = async (req, res) => {
    const brand =await BrandModel.find().limit(6)
    const car = await CarModel.find().limit(6)
    // console.log(brand)
    try {
      res.render("home", {
        msg: req.flash("error"),
        msg1: req.flash("success"),
        brand:brand,
        car:car
      });
    } catch (error) {
      console.log(error);
    }
  };
  static car_list = async (req, res) => {
    try {
      
      res.render("car-list", {
        
        msg: req.flash("error"),
        msg1: req.flash("success"),
      });
    } catch (error) {
      console.log(error);
    }
  };
  static listing_details = async (req, res) => {
    try {
      const id = req.params.id
      const cars = await CarModel.findById(id).limit(6)
      res.render("listing-details",{car:cars});
    } catch (error) {
      console.log(error);
    }
  };
  static contact = async (req, res) => {
    try {
      
      res.render("contact-us", {
       
        msg: req.flash("error"),
        msg1: req.flash("success"),
      });
    } catch (error) {
      console.log(error);
    }
  };
  static contactInsert = async (req, res) => {
    try {
      // console.log(req.body)
      const { name, email, phone, subject, message } = req.body;
      await ContactModel.create({
        name,
        email,
        phone,
        subject,
        message,
      });
      if (!name || !email || !phone || !message) {
        req.flash("error", "All Field Are Required !");
        res.redirect("/contact-us");
      } else {
        req.flash("success", "Message Send Success!");
        res.redirect("/contact-us");
      }
    } catch (error) {
      console.log(error);
    }
  };
  static registrationInsert = async (req, res) => {
    try {
      const { name, email, password, confirmpassword } = req.body;

      if (!name || !email || !password || !confirmpassword) {
        req.flash("error", "All Fields Are Required!");
        return res.redirect("/registrationInsert");
      }

      const isEmail = await UserModel.findOne({ email });
      if (isEmail) {
        req.flash("error", "Email Already Exist try another email!");
        return res.redirect("/registrationInsert");
      }

      if (password != confirmpassword) {
        req.flash("error", "Password Does not matched!");
        return res.redirect("/registrationInsert");
      }
      const file = req.files.image;
      const imageupload = await cloudinary.uploader.upload(file.tempFilePath, {
        folder: "car_rent",
      });
      //   console.log(imageupload)

      const hashpassword = await bcrypt.hash(password, 10);
      await UserModel.create({
        name,
        email,
        password: hashpassword,
        image: {
          public_id: imageupload.public_id,
          url: imageupload.secure_url,
        },
      });
      req.flash("success", "Registration Done!Now Tap on Login..");
      res.redirect("/");
    } catch (error) {
      console.log(error);
    }
  };

  static Login = async (req, res) => {
    try {
      //   console.log(req.body, { msg1: req.flash("success") });
      const { email, password } = req.body;

      const inEmail = await UserModel.findOne({ email });
      if (!inEmail) {
        req.flash("error", "Your Email is not Register!");
        res.redirect("/");
      } else {
        const isMatched = await bcrypt.compare(password, inEmail.password);
        console.log(isMatched);

        if (isMatched) {
          const token = jwt.sign({ id: inEmail.id }, "jwt121");
          res.cookie("token", token);

          // if(inEmail.role=='customer'){
          //   res.redirect('/')
          // }

          if (inEmail.role == "admin") {
            res.redirect("/admin/dashboard");
          } else {
            res.redirect("/");
          }
        } else {
          req.flash("error", "Email or Password doesn't  match.");
          res.redirect("/");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  static logout = async (req, res) => {
    try {
      res.clearCookie("token");
      res.redirect("/");
    } catch (error) {
      console.log(error);
    }
  };
}
module.exports = FrontController;
