var express = require("express");
var router = express.Router();
var passport = require("passport");

var Student = require("../models/student");
var Teacher = require("../models/staff");
var BookReference1 = require("../models/bookref1");
var BookReference2 = require("../models/bookref2");
var LostBooks = require("../models/lostbooks");
var PresentlyBorrow = require("../models/presentborrowed");
var BorrowHistory = require("../models/borrowhistory");
var No_Persons_In_Lib = require("../models/peoplecount");
var Same_Book_Count = require("../models/samebookcount");
var Reserved_Book = require("../models/reservedbook");
var New_Book_Request = require("../models/newbookrequest");
var New_Book_Order = require("../models/newbookorder");
var User = require("../models/userpassword");

//=======================================================================
router.get("/", function(req, res) {
  res.redirect("/digiLib");
});

router.get("/digiLib", function(req, res) {
  res.render("index/homepage");
});

router.get("/login", function(req, res) {
  res.render("index/login");
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login"
  }),
  function(req, res) {
    // console.log(req.body);
  }
);

router.get("/logout", function(req, res) {
  req.logout();
  res.redirect("/");
});
//=======================================================================
//STUDENTS
var sobj = [];
router.get("/digiStudentProfile/:id", function(req, res) {
  Student.findById(req.params.id)
    .populate("BorrowedBooks")
    .populate("BorrowedBooks1")
    .exec(function(err, studentObj) {
      BorrowHistory.find({ InTheHandsOfStudent: studentObj._id }, function(
        err,
        pb
      ) {
        console.log(pb);
        pb.forEach(function(tuple) {
          BookReference1.findById(tuple.bookRef1, function(err, b1) {
            var newBook = { b1: b1 };
            //console.log(newBook);
            sobj.push(newBook);
          });
        });
        console.log(sobj);
        setTimeout(() => {
          console.log("-----------------------");
          console.log(sobj);
          console.log("-----------------------");
          res.render("profile/studentProfile", {
            studentObj: studentObj,
            borrowedhistory: pb,
            bookdetails: sobj
          });
        }, 1000);
      });
    });
});
//=======================================================================
//TEACHER
var tobj = [];
router.get("/digiTeacherProfile/:id", function(req, res) {
  Teacher.findById(req.params.id)
    .populate("BorrowedBooks")
    .populate("BorrowedBooks1")
    .exec(function(err, teacherObj) {
      BorrowHistory.find({ InTheHandsOfTeacher: teacherObj._id }, function(
        err,
        pb
      ) {
        console.log(pb);
        pb.forEach(function(tuple) {
          BookReference1.findById(tuple.bookRef1, function(err, b1) {
            var newBook = { b1: b1 };
            //console.log(newBook);
            tobj.push(newBook);
          });
        });
        setTimeout(() => {
          res.render("profile/teacherProfile", {
            teacherObj: teacherObj,
            borrowedhistory: pb,
            bookdetails: tobj
          });
        }, 1000);
      });
    });
});
//=======================================================================
//ADMIN
router.get("/digiAdmin", function(req, res) {
  res.render("profile/admin");
});

//=======================================================================

// router.get('/studentdetails',function(req,res){
//     Student.find({},function(err,student){
//         setTimeout(() => {
//             res.render("index/studentdetails",{student:student,step:1})
//         }, 1000);

//     })
// })
router.get("/studentdetails", function(req, res) {
  Student.find({}, function(err, st) {
    res.render("index/studentdetails", { st: st, step: 1 });
  });
});
router.post("/studentdetails", function(req, res) {
  Student.find({}, function(err, stu) {
    var student = [];
    for (key in req.body) {
      //   console.log(req.body[key])
      if (req.body[key] === "") {
        req.body[key] = "null";
      }
      console.log(req.body);
    }
    stu.forEach(function(st) {
      name = st.St_name.toLowerCase();
      rollno = st.Roll_no.toLowerCase();
      email = st.St_email.toLowerCase();
      key1 = req.body.name.toLowerCase();
      key2 = req.body.roll_no.toLowerCase();
      key3 = req.body.email.toLowerCase();
      if (
        (name.includes(key1) == true) |
        (rollno.includes(key2) == true) |
        (email.includes(key3) == true)
      ) {
        student.push(st);
      }
    });

    res.render("index/studentdetails", { st: student, step: 2 });
  });
});
// router.get('/bookdetails',function(req,res){
//     BookReference1.find({},function(err,stu){
//         setTimeout(() => {
//             res.render("index/bookdetails",{book:stu,step:1})
//         }, 1000);

//     })
// })

// router.get('/teacherdetails',function(req,res){
//     Teacher.find({},function(err,stu){
//         setTimeout(() => {
//             res.render("index/teacherdetails",{teacher:stu,step:1})
//         }, 1000);

//     })
// })
router.get("/bookdetails", function(req, res) {
  BookReference1.find({}, function(err, book) {
    res.render("index/bookdetails", { book: book, step: 1 });
  });
});
router.post("/bookdetails", function(req, res) {
  BookReference1.find({}, function(err, stu) {
    var books = [];
    for (key in req.body) {
      //   console.log(req.body[key])
      if (req.body[key] === "") {
        req.body[key] = "null";
      }
      console.log(req.body);
    }
    stu.forEach(function(st) {
      author = st.Author_name.toLowerCase();
      bookname = st.Book_name.toLowerCase();
      key1 = req.body.name.toLowerCase();
      key2 = req.body.author.toLowerCase();
      if ((bookname.includes(key1) == true) | (author.includes(key2) == true)) {
        books.push(st);
      }
    });

    res.render("index/bookdetails", { book: books, step: 2 });
  });
});

router.get("/teacherdetails", function(req, res) {
  Teacher.find({}, function(err, stu) {
    res.render("index/teacherdetails", { teacher: stu, step: 1 });
  });
});

router.post("/teacherdetails", function(req, res) {
  Teacher.find({}, function(err, stu) {
    var teachers = [];
    for (key in req.body) {
      //   console.log(req.body[key])
      if (req.body[key] === "") {
        req.body[key] = "null";
      }
      console.log(req.body);
    }
    stu.forEach(function(st) {
      name = st.Fa_name.toLowerCase();
      rollno = st.Faculty_no.toLowerCase();
      email = st.Fa_email.toLowerCase();
      key1 = req.body.Fa_name.toLowerCase();
      key2 = req.body.id.toLowerCase();
      key3 = req.body.email.toLowerCase();
      if (
        (name.includes(key1) == true) |
        (rollno.includes(key2) == true) |
        (email.includes(key3) == true)
      ) {
        teachers.push(st);
      }
    });

    res.render("index/teacherdetails", { teacher: teachers, step: 2 });
  });
});

router.get("/borrowedbookdetails", function(req, res) {
  PresentlyBorrow.find({})
    .populate("bookRef1")
    .populate("InTheHandsOfStudent")
    .populate("InTheHandsOfTeacher")
    .exec(function(err, stu) {
      setTimeout(() => {
        console.log(stu);

        res.render("index/borrowedbookdetails", { book: stu, step: 1 });
      }, 1000);
    });
});

router.get("/borrowedhistorydetails", function(req, res) {
  BorrowHistory.find({})
    .populate("bookRef1")
    .populate("InTheHandsOfStudent")
    .populate("InTheHandsOfTeacher")
    .exec(function(err, stu) {
      setTimeout(() => {
        console.log(stu);
        res.render("index/borrowedhistorydetails", { book: stu, step: 1 });
      }, 1000);
    });
});

router.get("/lostbookdetails", function(req, res) {
  LostBooks.find({})
    .populate("bookRef1")
    .populate("InTheHandsOfStudent")
    .populate("InTheHandsOfTeacher")
    .exec(function(err, stu) {
      setTimeout(() => {
        console.log(stu);
        res.render("index/lostbookdetails", { book: stu, step: 1 });
      }, 1000);
    });
});

//=======================================================================
// view more details of student and teacher from admin profile

var ts = [];
router.get("/teacherdetails/:tid", function(req, res) {
  Teacher.findById(req.params.tid)
    .populate("BorrowedBooks")
    .populate("BorrowedBooks1")
    .exec(function(err, teacherObj) {
      BorrowHistory.find({ InTheHandsOfTeacher: teacherObj._id }, function(
        err,
        pb
      ) {
        console.log(pb);
        pb.forEach(function(tuple) {
          BookReference1.findById(tuple.bookRef1, function(err, b1) {
            var newBook = { b1: b1 };
            //console.log(newBook);
            ts.push(newBook);
          });
        });
        setTimeout(() => {
          res.render("index/MoreDetailsonTeacher", {
            teacherObj: teacherObj,
            borrowedhistory: pb,
            bookdetails: ts
          });
        }, 1000);
      });
    });
});
var ss = [];
router.get("/studentdetails/:sid", function(req, res) {
  Student.findById(req.params.sid)
    .populate("BorrowedBooks")
    .populate("BorrowedBooks1")
    .exec(function(err, studentObj) {
      BorrowHistory.find({ InTheHandsOfStudent: studentObj._id }, function(
        err,
        pb
      ) {
        console.log(pb);
        pb.forEach(function(tuple) {
          BookReference1.findById(tuple.bookRef1, function(err, b1) {
            var newBook = { b1: b1 };
            //console.log(newBook);
            ss.push(newBook);
          });
        });
        setTimeout(() => {
          res.render("index/MoreDetailsonStudent", {
            studentObj: studentObj,
            borrowedhistory: pb,
            bookdetails: ss
          });
        }, 1000);
      });
    });
});

//registering student and teacher passwords

router.get("/register", function(req, res) {
  res.render("index/register");
});

router.get("/showBookDetails/:id1/:id2", function(req, res) {
  BookReference1.findById(req.params.id1, function(err, book1) {
    BookReference2.findById(req.params.id2, function(err, book2) {
      BookReference2.find({ ISBN: book1.ISBN }, function(err, books) {
        PresentlyBorrow.find({})
          .populate("bookRef1")
          .populate("bookRef2")
          .populate("InTheHandsOfStudent")
          .populate("InTheHandsOfTeacher")
          .exec(function(err, pb) {
            var newPb = [];
            pb.forEach(item => {
              if (item.bookRef1.ISBN == book1.ISBN) {
                newPb.push(item);
              }
            });
            setTimeout(() => {
              res.render("index/example_show_book", {
                book1: book1,
                book2: book2,
                books: books,
                pb: newPb
              });
            }, 1000);
          });
      });
    });
  });
});

router.get("/showBookDetails/:id1", function(req, res) {
  BookReference1.findById(req.params.id1, function(err, book1) {
    BookReference2.find({ ISBN: book1.ISBN }, function(err, books) {
      PresentlyBorrow.find({})
        .populate("bookRef1")
        .populate("bookRef2")
        .populate("InTheHandsOfStudent")
        .populate("InTheHandsOfTeacher")
        .exec(function(err, pb) {
          var newPb = [];
          pb.forEach(item => {
            if (item.bookRef1.ISBN == book1.ISBN) {
              newPb.push(item);
            }
          });
          setTimeout(() => {
            res.render("index/example_show_book_all", {
              book1: book1,
              books: books,
              pb: newPb
            });
          }, 1000);
        });
    });
  });
});

// console.log(json2)
router.get("/ct", function(req, res) {
  Student.deleteMany({}, function() {});
  Teacher.deleteMany({}, function() {});
  BookReference1.deleteMany({}, function() {});
  BookReference2.deleteMany({}, function() {});
  BorrowHistory.deleteMany({}, function() {});
  PresentlyBorrow.deleteMany({}, function() {});
  LostBooks.deleteMany({}, function() {});
  res.redirect("/");
});
// console.log(req.body);
// obj=req.body;
// for (var prop in obj) {
//     // console.log((obj[prop]))
//     console.log(typeof(prop))
//     if(obj[prop] == ''){
//         delete obj[prop];
//     }
//     console.log(obj.prop)
// }

// console.log(obj);
router.get("/register", function(req, res) {
  res.render("index/register");
});

router.post("/register", function(req, res) {
  var newUserUsername;
  if (req.body.check == "student") {
    Student.findOne({ Roll_no: req.body.username }, function(err, st) {
      if (err) {
        console.log(err);
      }
      console.log(st);

      newUserUsername = new User({
        username: req.body.username,
        student: st._id
        // teacher:st._id,
      });
      // console.log(newUserUsername)
      var newUserPassword = req.body.password;
      User.register(newUserUsername, newUserPassword, function(err, user) {
        if (err) {
          console.log(err);
          return res.redirect("/");
        }
        passport.authenticate("local")(req, res, function() {
          // console.log(user)
          res.redirect("/register");
        });
      });
    });
  } else if (req.body.check == "issuer") {
    newUserUsername = new User({
      username: req.body.username
    });
    var newUserPassword = req.body.password;
    User.register(newUserUsername, newUserPassword, function(err, user) {
      if (err) {
        console.log(err);
        return res.redirect("/");
      }
      passport.authenticate("local")(req, res, function() {
        res.redirect("/register");
      });
    });
  } else if (req.body.check == "admin") {
    newUserUsername = new User({
      username: req.body.username
    });
    var newUserPassword = req.body.password;
    User.register(newUserUsername, newUserPassword, function(err, user) {
      if (err) {
        console.log(err);
        return res.redirect("/");
      }
      passport.authenticate("local")(req, res, function() {
        res.redirect("/register");
      });
    });
  } else {
    Teacher.findOne({ Faculty_no: req.body.username }, function(err, st) {
      if (err) {
        res.send("error");
      }
      console.log(st);

      newUserUsername = new User({
        username: req.body.username,
        teacher: st._id
      });
      // console.log(newUserUsername)
      var newUserPassword = req.body.password;
      User.register(newUserUsername, newUserPassword, function(err, user) {
        if (err) {
          console.log(err);
          return res.redirect("/");
        }
        passport.authenticate("local")(req, res, function() {
          // console.log(user)
          res.redirect("/register");
        });
      });
    });
  }
});

router.get("/using", function(req, res) {
  BookReference1.updateMany(
    {},
    { $set: { ReserveCount: 0, No_books_reserved: 0 } },
    function(err, b1) {
      console.log(b1);
      res.redirect("/");
    }
  );
});

module.exports = router;
