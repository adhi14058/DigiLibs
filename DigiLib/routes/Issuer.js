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
//issuer profile page
router.get('/digiIssuer', function (req, res) {
    res.render('issuer/issuerProfile');
})

//issuer get credentials page
router.get('/digiIssuer/issue/Credentials', function (req, res) {
    res.render('issuer/issuerGetCredentials');
})

router.post('/digiIssuer/issue/Credentials', function (req, res) {

    if (req.body.submit == "Submit") {
        if (req.body.check == "student") {
            Student.findOne({
                Roll_no: req.body.rollno
            }, function (err, st) {
                if (err) {
                    console.log(err)
                } else {
                    BookReference2.find({
                        In_status: 1
                    }, function (err, books) {
                        res.redirect('/digiIssuer/issue/' + st._id)
                    })
                }
            })
        } else {
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
    } else {
        res.redirect("back");
    }
})

//issuer display student page
router.get('/digiIssuer/issue/:stid',function(req,res){
    Student.findById(req.params.stid).populate('BorrowedBooks').populate('BorrowedBooks1').exec(function(err,stu){
        BookReference2.find({In_status:1}).sort({Identification_no: 'asc'}).exec(function(err,books){
            PresentlyBorrow.find({InTheHandsOfStudent:stu._id},function(err,pb){
                pb.forEach(function(tuple){
                    now=new Date()
                    tuple.Fine=(Math.max(0,(Math.ceil((now-tuple.Expected_return_date)/(1000*3600*24)))));
                    tuple.save();
                })
                stu.BorrowedBooks.forEach(function(tuple){
                    now=new Date()
                    PresentlyBorrow.findOne({Identification_no:tuple.Identification_no},function(err,pb){
                        tuple.Fine=(Math.max(0,(Math.ceil((now-pb.Expected_return_date)/(1000*3600*24)))));
                        tuple.save();
                        console.log(tuple);
                    })
                })
                setTimeout(function(){
                    res.render("index/example",{st:stu,books:books,step:1,pb:pb})
                }, 1000)
                
            })
        })
    })
})

//issuer display student page and post for book to be shown
router.post('/digiIssuer/issue/:stid',function(req,res){
    BookReference2.findOne({Identification_no:req.body.unique_id},function(err,bookref2){
        if(!bookref2){
            return res.redirect("back");
        }
        BookReference1.findOne({ISBN:bookref2.ISBN},function(err,bookref1){
                 Student.findById(req.params.stid,function(err,st){
                    console.log(st)
                    res.redirect('/digiIssuer/issue/'+req.params.stid+'/'+bookref1._id+'/'+bookref2._id)
                 })
             
        })
    })
})

//issuer display student page and book he is going to issue
router.get('/digiIssuer/issue/:sid/:b1id/:b2id',function(req,res){
    console.log("inside")
    Student.findById(req.params.sid).populate('BorrowedBooks').populate('BorrowedBooks1').exec(function(err,stu){
        BookReference1.findById(req.params.b1id,function(err,b1){
            BookReference2.findById(req.params.b2id,function(err,b2){
                BookReference2.find({In_status:1}).sort({Identification_no: 'asc'}).exec(function(err,books){
                    PresentlyBorrow.find({InTheHandsOfStudent:stu._id},function(err,pb){
                        pb.forEach(function(tuple){
                            now=new Date()
                            tuple.Fine=(Math.max(0,(Math.ceil((now-tuple.Expected_return_date)/(1000*3600*24)))));
                            tuple.save();
                        })
                        stu.BorrowedBooks.forEach(function(tuple){
                            now=new Date()
                            PresentlyBorrow.findOne({Identification_no:tuple.Identification_no},function(err,pb){
                                tuple.Fine=(Math.max(0,(Math.ceil((now-pb.Expected_return_date)/(1000*3600*24)))));
                                tuple.save();
                                console.log(tuple);
                            })
                        })
                        flag=1;
                        stu.BorrowedBooks.forEach(function(item){
                            if(item.ISBN==b1.ISBN){
                                flag=0;
                                console.log('same book found')
                            }
                        })

                        if(flag==1){
                            console.log('same book not found')
                            setTimeout(function(){
                                res.render("index/example",{st:stu,bookref1:b1,bookref2:b2,books:books,step:2,pb:pb})
                            }, 1000)
                        }else{
                            setTimeout(function(){
                                res.render("index/example",{st:stu,bookref1:b1,bookref2:b2,books:books,step:3,pb:pb})
                            }, 1000)

                        }
                    })
                })
            })
        })
    })
})


//post request for issuing book
router.post('/digiIssuer/issue/:sid/:b1id/:b2id',function(req,res){
    Student.findById(req.params.sid).populate('BorrowedBooks').populate('BorrowedBooks1').exec(function(err,stu){
        BookReference1.findById(req.params.b1id,function(err,bookr1){
            BookReference2.findById(req.params.b2id,function(err,bookr2){
                flag=1;
                stu.BorrowedBooks.forEach(function(item){
                    if(item.ISBN==bookr1.ISBN){
                        flag=0;
                        res.redirect('/digiIssuer/issue/'+stu._id)
                    }
                })
                if(flag==1){
                var numberOfDaysToAdd = 15;
                d= new Date();
                PresentlyBorrow.create({
                    Identification_no:bookr2.Identification_no,
                    Rack_id:bookr2.Rack_id,
                    Date_when_borrowed: new Date(),
                    Expected_return_date:d.setDate(d.getDate() + numberOfDaysToAdd),
                    InTheHandsOfStudent:stu._id,
                    bookRef1:bookr1._id,
                    bookRef2:bookr2._id,
                    Fine:0

                },function(err,prbr){
                    if(err){
                        console.log(err)
                    }else{
                        stu.BorrowedBooks.push(bookr2._id);
                        stu.BorrowedBooks1.push(bookr1._id);
                        stu.save();
                        bookr2.InTheHandsOfStudent=stu._id;
                        bookr2.In_status=0;
                        bookr2.Fine=0;
                        bookr2.save();
                        bookr1.No_books_borrowed+=1;
                        bookr1.No_times_book_borrowed+=1;
                        bookr1.No_books_inside_library-=1;
                        bookr1.save();
                        res.redirect('/digiIssuer/issue/'+stu._id)
                    }
                })
            }
            })
        
        })
    })
})

//post request for reissuing book

router.post('/digiIssuer/reissue/:sid/:b1id/:b2id',function(req,res){
    Student.findById(req.params.sid,function(err,stu){
        BookReference1.findById(req.params.b1id,function(err,bookr1){
            BookReference2.findById(req.params.b2id,function(err,bookr2){
                PresentlyBorrow.findOneAndDelete({Identification_no:bookr2.Identification_no},function(err,depb){
                    var numberOfDaysToAdd = 15;
                    d= new Date();
                PresentlyBorrow.create({
                    Identification_no:bookr2.Identification_no,
                    Rack_id:bookr2.Rack_id,
                    Date_when_borrowed: new Date(),
                    Expected_return_date:d.setDate(d.getDate() + numberOfDaysToAdd),
                    InTheHandsOfStudent:stu._id,
                    bookRef1:bookr1._id,
                    bookRef2:bookr2._id,
                    Fine:0

                },function(err,prbr){
                    bookr1.No_times_book_borrowed+=1;
                    bookr1.save();
                    bookr2.Fine=0;
                    bookr2.save();
                    BorrowHistory.create({
                        Identification_no:bookr2.Identification_no,
                        Rack_id:bookr2.Rack_id,
                        Date_when_borrowed:depb.Date_when_borrowed,
                        Actual_return_date:new Date(),
                        Expected_return_date:depb.Expected_return_date,
                        Fine:depb.Fine,
                        bookRef1:bookr1._id,
                        bookRef2:bookr2._id,
                        InTheHandsOfStudent:stu._id
                    },function(err,bh){
                        res.redirect('/digiIssuer/issue/'+stu._id)
                    })
                })
                })
            })
        })
    })
})


//post request for returning book

router.post('/digiIssuer/return/:sid/:b1id/:b2id',function(req,res){
    Student.findById(req.params.sid,function(err,stu){
        BookReference1.findById(req.params.b1id,function(err,bookr1){
            BookReference2.findById(req.params.b2id,function(err,bookr2){
                PresentlyBorrow.findOneAndDelete({Identification_no:bookr2.Identification_no},function(err,depb){
                    BorrowHistory.create({
                        Identification_no:bookr2.Identification_no,
                        Rack_id:bookr2.Rack_id,
                        Date_when_borrowed:depb.Date_when_borrowed,
                        Actual_return_date:new Date(),
                        Expected_return_date:depb.Expected_return_date,
                        Fine:depb.Fine,
                        bookRef1:bookr1._id,
                        bookRef2:bookr2._id,
                        InTheHandsOfStudent:stu._id
                    },function(err,bh){
                        if(err){
                            res.redirect("back");
                        }
                        stu.BorrowedBooks.splice(stu.BorrowedBooks.indexOf(bookr2._id),1);
                        stu.BorrowedBooks1.splice(stu.BorrowedBooks1.indexOf(bookr1._id),1);
                        stu.save();
                         bookr2["InTheHandsOfStudent"]=undefined;
                        bookr2.In_status=1;
                        bookr2.Fine=undefined;
                        bookr2.save();
                        bookr1.No_books_borrowed-=1;
                        bookr1.No_books_inside_library+=1;
                        bookr1.save();
                        res.redirect('/digiIssuer/issue/'+stu._id)
                    })

                })
            })
        })
    })
})


//post request for lost book
router.post('/digiIssuer/lost/:sid/:b1id/:b2id',function(req,res){
    Student.findById(req.params.sid,function(err,stu){
        BookReference1.findById(req.params.b1id,function(err,bookr1){
            BookReference2.findById(req.params.b2id,function(err,bookr2){
                PresentlyBorrow.findOneAndDelete({Identification_no:bookr2.Identification_no},function(err,depb){
                    if(err){
                         console.log(err);
                    }
                    LostBooks.create({
                        Identification_no:bookr2.Identification_no, 
                        Fine:bookr1.Price+depb.Fine+500,
                        Date_when_borrowed:depb.Date_when_borrowed,
                        Date_entered_table:new Date(),
                        bookRef1:bookr1._id, 
                        bookRef2:bookr2._id,
                        InTheHandsOfStudent:stu._id
                    },function(err,insertedLostBook){
                        if(err){
                            console.log(err);
                        }
                            
                            stu.BorrowedBooks.splice(stu.BorrowedBooks.indexOf(bookr2._id),1);
                            stu.BorrowedBooks1.splice(stu.BorrowedBooks1.indexOf(bookr1._id),1);
                            stu.save();
                            bookr1.No_books_present-=1;
                            bookr1.No_books_lost+=1;
                            bookr1.No_books_borrowed-=1;
                            bookr1.save();
                            bookr2.In_status=-1;
                            bookr2.InTheHandsOfStudent=undefined;
                            bookr2.save();
                            res.redirect('/digiIssuer/issue/'+stu._id)
                        
                    })
                })
            })
        })
    })
})

module.exports=router;