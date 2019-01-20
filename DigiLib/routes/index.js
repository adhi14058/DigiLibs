var express=require('express');
var router=express.Router();
var passport=require('passport');



var Student               =require('../models/student')
var Teacher               =require('../models/staff')
var BookReference1        =require('../models/bookref1')
var BookReference2        =require('../models/bookref2')
var LostBooks             =require('../models/lostbooks')
var PresentlyBorrow       =require('../models/presentborrowed')
var BorrowHistory         =require('../models/borrowhistory')
var No_Persons_In_Lib     =require('../models/peoplecount')
var Same_Book_Count       =require('../models/samebookcount')
var Reserved_Book         =require('../models/reservedbook')
var New_Book_Request      =require('../models/newbookrequest')
var New_Book_Order        =require('../models/newbookorder')
var User                  =require('../models/userpassword')

//=======================================================================
router.get('/',function(req,res){
    res.redirect('/digiLib')
})

router.get('/digiLib',function(req,res){
    res.render('index/homepage')
})

router.get('/login',function(req,res){
    res.render('index/login')
})


router.post('/login',passport.authenticate("local",{
    successRedirect:'/',
    failureRedirect:'/login',
}),function(req,res){
    console.log(req.body);
})

router.get('/logout',function(req,res){
    req.logout()
    res.redirect('/');
})
//=======================================================================

//STUDENTS
router.get('/digiStudentProfile',function(req,res){
    res.render('profile/studentProfile')
})
//=======================================================================

//TEACHER
router.get('/digiTeacherProfile',function(req,res){
    res.render('profile/teacherProfile')
})
//=======================================================================
//ADMIN

router.get('/digiAdmin',function(req,res){
    res.render('profile/admin')
})



//=======================================================================
//ISSUER

router.get('/digiIssuer',function(req,res){
    res.render('Issuer/IssuerProfile')
})

router.get('/digiIssuer/issue',function(req,res){
    res.render('Issuer/IssueBooks')
})

router.post('/digiIssuer/issue',function(req,res){
    res.send('The books will be issued on your name '+req.body.option)
    // res.redirect('/digiIssuer')
})

//=======================================================================
//=======================================================================
//=======================================================================
//registering student and teacher passwords


router.get('/register',function(req,res){
    res.render('index/register');
    // User.findOne({}).populate('student').exec(function(err,user){
    //     if(err){
    //         console.log(err)
    //     }else{
    //         // console.log(user)
    //         s=user.student;
    //         console.log(typeof(s))
    //         console.log(s.Roll_no);
    //         // Student.findById(s._id,function(err,lolaai){
    //         //     console.log(lolaai.St_name);
    //         // })
    //         res.render('index/register');
    //     }
    // })
    
})

router.post('/register',function(req,res){
    console.log(req.body);
    obj=req.body;
    for (var prop in obj) {
        // console.log((obj[prop]))
        console.log(typeof(prop))
        if(obj[prop] == ''){
            delete obj[prop];
        }
        console.log(obj.prop)
    }
 
    console.log(obj);
//     var newUserUsername;
//     if (req.body.check=="student"){
//         Student.findOne({Roll_no:req.body.username},function(err,st){
//             if(err){
//                 console.log(err)
//             }
//             console.log((st))
     
//                 newUserUsername=new User({
//                 username:req.body.username,
//                 student:st._id,
//                 // teacher:st._id,
//             });
//             // console.log(newUserUsername)
//             var newUserPassword=req.body.password;
//             User.register(newUserUsername,newUserPassword,function(err,user){
//                 if(err){
//                     console.log(err)
//                     return res.redirect('/')
//                 }
//                 passport.authenticate('local')(req,res,function(){
//                     // console.log(user)
//                     res.redirect('/register')
//                 })
//             })
//         })

//     }else{
//         Teacher.findOne({Faculty_no:req.body.username},function(err,st){
//             if(err){
//                 res.send('error')
//             }
//             console.log((st))
     
//                  newUserUsername=new User({
//                 username:req.body.username,
//                 teacher:st._id,
//             });
//             // console.log(newUserUsername)
//             var newUserPassword=req.body.password;
//             User.register(newUserUsername,newUserPassword,function(err,user){
//                 if(err){
//                     console.log(err)
//                     return res.redirect('/')
//                 }
//                 passport.authenticate('local')(req,res,function(){
//                     // console.log(user)
//                     res.redirect('/register')
//                 })
//             })
//         })
//     }
 })
router.get('/example',function(req,res){
    res.render('index/example');
})

module.exports=router;