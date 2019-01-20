var mongoose=require('mongoose');

var teacherSchema= new mongoose.Schema({
    Faculty_no:String,
    Fa_name:String,
    Fa_phone_no:Number,
    Fa_email:String,
    BorrowedBooks:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"BookReference2"
        }
    ]
});
var Teacher=mongoose.model("Teacher",teacherSchema);

module.exports=Teacher;