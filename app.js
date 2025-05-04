const express = require("express");
const app = express();
const port = 3000;
const web = require("./route/web");
const connectDB = require("./data base/connectDB");
const fileupload = require("express-fileupload");
const cookieparser=require('cookie-parser')

//cookies
app.use(cookieparser())

//help in image upload
app.use(fileupload({ useTempFiles: true }));

//ejs
app.set("view engine", "ejs");
//for css
app.use(express.static("public"));
//data base connection
connectDB();
//Userinsert converting into object form
app.use(express.urlencoded({ extended: false }));

//flashh
const flash = require("connect-flash");
const session = require("express-session");
// SESSION SETUP
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: { httpOnly: true },
  })
);
//flash message
app.use(flash());

// Middleware to pass user to all views
app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  next();
});


//route load
app.use("/", web);
//server start
app.listen(port, () => {
  console.log(`server start localhost:${port}`);
});
