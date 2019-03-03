var mongoose=require('mongoose');
var reserved_bookSchema =new mongoose.Schema({
    Identification_no:String,//unique number for each book
    Date_when_reserved:Date,
    bookRef1:
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"BookReference1"
        },
    bookRef2:
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"BookReference2"
        },
        InTheHandsOfStudent:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Student"
        },
        InTheHandsOfTeacher:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Teacher"
        },
        status:Number //book not inside lib-->1  //book inside but not given to stu --> 2   //book given to student-->3
});
var Reserved_Book= mongoose.model("Reserved_Book",reserved_bookSchema);
module.exports=Reserved_Book;