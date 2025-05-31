const express = require("express");
const FrontController = require("../controller/FrontController");
const AdminController = require("../controller/admin/AdminController");
const BrandController = require("../controller/admin/BrandController");
const checkAuth = require("../middleware/auth");
const BookingController = require("../controller/BookingController");
const CarController = require("../controller/admin/CarController");
const InventoryController = require("../controller/admin/InventoryController");
const route = express.Router();


route.get('/',FrontController.home)
route.get('/about',FrontController.about)
route.get('/car-list',FrontController.car_list)
route.get('/contact-us',FrontController.contact)
route.get('/listing-details/:id',FrontController.listing_details)
route.post('/registrationInsert',FrontController.registrationInsert)
route.post('/verifyLogin',FrontController.Login)
route.get('/logout',FrontController.logout)

//Profile
route.get('/profile',checkAuth,FrontController.profile)
route.get('/changepass',checkAuth,FrontController.changepass)
route.post('/changePassword',checkAuth,FrontController.changePassword)
route.post('/updateProfile',checkAuth,FrontController.updateProfile)
route.get('/booking',checkAuth,BookingController.carbooking)
// Booking Insert
route.post('/bookingInsert',BookingController.createBooking)


///////////    userInserts   ///////////
//contact
route.post('/contactInsert',FrontController.contactInsert)


//admin
route.get('/admin/dashboard',checkAuth,AdminController.dashboard)
route.get('/admin/addcar',checkAuth,CarController.addcar)
route.get('/admin/brand',checkAuth,BrandController.brandcreate)
route.get('/admin/inventory',checkAuth,InventoryController.inventory)

route.post('/admin/update_status/:id',checkAuth,InventoryController.bookingStatus)
//////////   Admin  brandInsert   ///////////
route.post('/admin/brandInsert',checkAuth,BrandController.brandInsert)
route.get('/admin/deletebrand/:id',checkAuth,BrandController.brand_delete)
route.get('/admin/editbrand/:id',checkAuth,BrandController.brand_edit)
route.post('/admin/brandupdate/:id',checkAuth,BrandController.brand_update)

//////////     Admin  CarInsert   ////////////
route.post('/admin/carinsert',checkAuth,CarController.carInsert)
route.get('/admin/deletecardetail/:id',checkAuth,CarController.deleteCarDetail)
route.get('/admin/editcardetail/:id',checkAuth,CarController.editcar)
route.post('/admin/editcardetail/:id',checkAuth,CarController.carUpdateInsert)

module.exports = route;
