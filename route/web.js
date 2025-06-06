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
route.get('/admin/dashboard',AdminController.dashboard)
route.get('/admin/addcar',CarController.addcar)
route.get('/admin/brand',BrandController.brandcreate)
route.get('/admin/inventory',InventoryController.inventory)

//////// /// ///  Inventory update status // /// // ////////
route.post('/admin/update_status/:id',InventoryController.bookingStatus)

//////////   Admin  brandInsert   ///////////
route.post('/admin/brandInsert',BrandController.brandInsert)
route.get('/admin/deletebrand/:id',BrandController.brand_delete)
route.get('/admin/editbrand/:id',BrandController.brand_edit)
route.post('/admin/brandupdate/:id',BrandController.brand_update)

//////////     Admin  CarInsert   ////////////
route.post('/admin/carinsert',CarController.carInsert)
route.get('/admin/deletecardetail/:id',CarController.deleteCarDetail)
route.get('/admin/editcardetail/:id',CarController.editcar)
route.post('/admin/editcardetail/:id',CarController.carUpdateInsert)

module.exports = route;
