const ContactModel = require("../model/contact");
const UserModel = require("../model/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cloudinary = require("cloudinary");
const BrandModel = require('../model/brand')
const CarModel = require('../model/car')
const BookingModel = require('../model/booking')


// Configuration
cloudinary.config({
  cloud_name: "ddblbrvxl",
  api_key: "674549153778279",
  api_secret: "tdXOWN_-uNiQUxj8Emqd8KvJcUA",
});

class FrontController {
  static home = async (req, res) => {
    const brand = await BrandModel.find().limit(6)
    const car = await CarModel.find().limit(6)
    // console.log(brand)
    try {
      res.render("home", {
        msg: req.flash("error"),
        msg1: req.flash("success"),
        brand: brand,
        car: car
      });
    } catch (error) {
      console.log(error);
    }
  };
  static about = async (req, res) => {
    try {
      res.render('about')
    } catch (error) {
      console.log(error)
    }
  }
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
      // const users = await UserModel.find()
      res.render("listing-details", {
        car: cars,
        user : req.session.user,
      });

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
            req.session.user = {
              name: inEmail.name,
              email: inEmail.email,
              image: inEmail.image
            }
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
      req.session.destroy()
      res.clearCookie("token");
      res.redirect("/");
    } catch (error) {
      console.log(error);
    }
  };
  static profile = async (req, res) => {
    try {
      const { name, email, image } = req.udata
      res.render('profile', { n: name, e: email, i: image })
    } catch (error) {
      console.log(error)
    }
  }
  static changepass = async (req, res) => {
    try {
      const { name, image } = req.udata
      res.render('changepass', { n: name, i: image })
    } catch (error) {
      console.log(error)
    }
  }
  static changePassword = async (req, res) => {
    try {
      const { id } = req.udata
      // console.log(req.body);
      const { op, np, cp } = req.body;
      if (op && np && cp) {
        const user = await UserModel.findById(id);
        const isMatched = await bcrypt.compare(op, user.password);
        //console.log(isMatched)
        if (!isMatched) {
          req.flash("error", "Current password is incorrect ");
          res.redirect("/profile");
        } else {
          if (np != cp) {
            req.flash("error", "Password does not match");
            res.redirect("/profile");
          } else {
            const newHashPassword = await bcrypt.hash(np, 10);
            await UserModel.findByIdAndUpdate(id, {
              password: newHashPassword,
            });
            req.flash("success", "Password Updated successfully ");
            res.redirect("/");
          }
        }
      } else {
        req.flash("error", "ALL fields are required ");
        res.redirect("/profile");
      }
    } catch (error) {
      console.log(error);
    }

  };
  static updateProfile = async (req, res) => {
    try {
      const { id } = req.udata
      console.log(id)
      const { name, email } = req.body;
      if (req.files) {
        const user = await UserModel.findById(id);
        const imageID = user.image.public_id;
        // console.log(imageID);

        //deleting image from Cloudinary
        await cloudinary.uploader.destroy(imageID);
        //new image update
        const imagefile = req.files.image;
        const imageupload = await cloudinary.uploader.upload(
          imagefile.tempFilePath,
          {
            folder: "userprofile",
          }
        );
        var data = {
          name: name,
          email: email,
          image: {
            public_id: imageupload.public_id,
            url: imageupload.secure_url,
          },
        };
      } else {
        var data = {
          name: name,
          email: email,
        };
      }
      await UserModel.findByIdAndUpdate(id, data);
      req.flash("success", "Update Profile successfully");
      res.redirect("/profile");
    } catch (error) {
      console.log(error);
    }
  };


}
module.exports = FrontController;
