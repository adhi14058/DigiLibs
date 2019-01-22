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
    // console.log(req.body);
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
    
    res.render('issuer/issuerProfile');

    
})
router.post('/digiIssuer',function(req,res){

    if (req.body.submit=="Submit"){
                if (req.body.check=="student"){
                    Student.findOne({Roll_no:req.body.rollno},function(err,st){
                                    if(err){
                                        console.log(err)
                                    }
                                    else
                                    {  
                                        //  console.log(req.body)
                                        BookReference2.find({In_status:1},function(err,books){
                                        //  console.log(st)
                                        res.redirect('/bookissue/'+st._id)
                                        
                                        
                                        })
                                    
                                    }                     
                                })
                    }
                else{
                // Teacher.findOne({Faculty_no:req.body.rollno},function(err,st){
                //     if(err){
                //         console.log(err)
                //     }
                //     else
                //     {  BookReference2.find({In_status:1},function(err,books){

                    
                //        res.render("example",{st:st,books:books})
                //     })
                //     }
                // })
                }
            }
            else{
                res.redirect("back");
            }
})

router.get('/bookissue/:stid',function(req,res){
    BookReference2.find({In_status:1},function(err,books){
        Student.findById(req.params.stid).populate('BorrowedBooks').populate('BorrowedBooks1').exec(function(err,stu){

                res.render("index/example",{st:stu,books:books,step:1})
        })
    })
})

router.post('/bookissue/:stid',function(req,res){
    BookReference2.findOne({Identification_no:req.body.unique_id},function(err,bookref2){
        BookReference1.findOne({ISBN:bookref2.ISBN},function(err,bookref1){
            BookReference2.find({In_status:1},function(err,books){
                 Student.findById(req.params.stid,function(err,st){
                    // console.log('==================================')
                    // console.log(req.params)
                    // console.log(bookref2)
                    // console.log(books[0])
                    // console.log(bookref1)
                    // console.log('=================================')
                    res.redirect('/bookissue/'+st._id+'/'+bookref1._id+'/'+bookref2._id)
                   
                 })
             })
        })
    })
})
router.get('/bookissue/:sid/:b1id/:b2id',function(req,res){
        Student.findById(req.params.sid).populate('BorrowedBooks').populate('BorrowedBooks1').exec(function(err,stu){

            BookReference1.findById(req.params.b1id,function(err,b1){
                BookReference2.findById(req.params.b2id,function(err,b2){
                    BookReference2.find({In_status:1},function(err,books){
                        res.render("index/example",{st:stu,bookref1:b1,bookref2:b2,books:books,step:2})
                    })
                })
            })
        })
})

// router.get('/digiIssuer/issue',function(req,res){
//     res.render('Issuer/IssueBooks')
// })

    router.post('/bookIssue/:sid/:b1id/:b2id',function(req,res){
        Student.findById(req.params.sid,function(err,stu){
            BookReference1.findById(req.params.b1id,function(err,bookr1){
                BookReference2.findById(req.params.b2id,function(err,bookr2){
                    var numberOfDaysToAdd = 15;
                    d= new Date();
                    PresentlyBorrow.create({
                        Identification_no:bookr2.Identification_no,
                        Rack_id:bookr2.Rack_id,
                        Date_when_borrowed: new Date(),
                        Expected_return_date:d.setDate(d.getDate() + numberOfDaysToAdd),
                        InTheHandsOfStudent:stu._id

                    },function(err,prbr){
                        if(err){
                            console.log(err)
                        }else{
                            stu.BorrowedBooks.push(bookr2._id);
                            stu.BorrowedBooks1.push(bookr1._id);
                            stu.save();
                            bookr2.InTheHandsOfStudent=stu._id;
                            bookr2.In_status=0;
                            bookr2.save();
                            bookr1.No_books_borrowed+=1;
                            bookr1.No_times_book_borrowed+=1;
                            bookr1.No_books_inside_library-=1;
                            bookr1.save();
                            res.redirect('/bookissue/'+stu._id)
                        }
                    })
                })
            })
        })
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

module.exports=router;