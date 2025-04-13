const express = require("express");
const FrontController = require("../controller/FrontController");
const AdminController = require("../controller/admin/AdminController");
const BrandController = require("../controller/admin/BrandController");
const checkAuth = require("../middleware/auth");
const route = express.Router();


route.get('/',FrontController.home)
route.get('/car-list',FrontController.car_list)
route.get('/contact-us',FrontController.contact)
route.get('/listing-details',FrontController.listing_details)
route.post('/registrationInsert',FrontController.registrationInsert)
route.post('/verifyLogin',FrontController.Login)
route.get('/logout',FrontController.logout)

///////////    userInserts   ///////////
//contact
route.post('/contactInsert',checkAuth,FrontController.contactInsert)


//admin
route.get('/admin/dashboard',AdminController.dashboard)
route.get('/admin/addcar',AdminController.addcar)
route.get('/admin/brand',AdminController.brandcreate)
//////////     brandInsert   ///////////
route.post('/admin/brandInsert',BrandController.brandInsert)
route.get('/admin/deletebrand/:id',BrandController.brand_delete)
route.get('/admin/editbrand/:id',BrandController.brand_edit)
route.post('/admin/brandupdate/:id',BrandController.brand_update)


module.exports = route;
