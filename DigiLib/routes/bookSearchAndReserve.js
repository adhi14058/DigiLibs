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

router.get('/digiSearch',function(req,res){
    BookReference1.find({},function(err,b1){
        if(err){
            console.log(err)
        }else{
            if(req.user && req.user.student){
                Student.findById(req.user.student).populate('BorrowedBooks').populate('BorrowedBooks1').exec(function(err,stu){
                    Reserved_Book.find({status:{$in:[1,2]}, InTheHandsOfStudent:stu._id}).populate('bookRef1').populate('InTheHandsOfStudent').exec(function(err,rb){
                        res.render('index/searchPage',{book:b1,user:stu,rb:rb})
                    })
                })
            }else if(req.user && req.user.teacher){
                Teacher.findById(req.user.teacher).populate('BorrowedBooks').populate('BorrowedBooks1').exec(function(err,teacher){
                    Reserved_Book.find({status:{$in:[1,2]},InTheHandsOfTeacher:teacher._id}).populate('bookRef1').populate('InTheHandsOfTeacher').exec(function(err,rb){
                        res.render('index/searchPage',{book:b1,user:teacher,rb:rb})
                    })
                })
            }else{
                res.redirect('/')
            }
      
        }
    })
    
})

router.post('/digiSearch',function(req,res){

})



//=======================================================================

module.exports=router;