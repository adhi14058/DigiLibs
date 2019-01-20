var express=require("express");
var app=express();
app.use(express.static("public"));

var bodyParser=require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

var mongoose=require("mongoose");
mongoose.connect("mongodb://localhost/Librarymanagement");
var url = "mongodb://localhost:27017/";
app.set("view engine","ejs");


var Student               =require('./models/student')
var Teacher               =require('./models/staff')
var BookReference1        =require('./models/bookref1')
var BookReference2        =require('./models/bookref2')
var LostBooks             =require('./models/lostbooks')
var PresentlyBorrow       =require('./models/presentborrowed')
var BorrowHistory         =require('./models/borrowhistory')
var No_Persons_In_Lib     =require('./models/peoplecount')
var Same_Book_Count       =require('./models/samebookcount')
var Reserved_Book         =require('./models/reservedbook')
var New_Book_Request      =require('./models/newbookrequest')
var New_Book_Order        =require('./models/newbookorder')
var User                  =require('./models/userpassword')
// passport configuration
// ==============================================
var passport=require('passport');
var localStrategy=require('passport-local')
app.use(require('express-session')({
    secret:'this is a secret',
    resave:false,
    saveUninitialized:false
}))
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
// ==============================================
//roues

var indexRoute=require('./routes/index')

app.use(indexRoute);



app.listen(3000,function(){
    console.log("server started");

})