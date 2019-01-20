var mongoose=require('mongoose');

var studentSchema= new mongoose.Schema({
    Roll_no:String,
    St_name:String,
    St_phone_no:Number,
    St_email:String,
    BorrowedBooks:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"BookReference2"
        }
    ]
});
var Student=mongoose.model("Student",studentSchema);

module.exports=Student;