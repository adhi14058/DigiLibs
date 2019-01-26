var mongoose=require('mongoose');
var reserved_bookSchema =new mongoose.Schema({
    Id_no:String,  // id_no as it can be both faculty as well as student bcoz its a common table
    Identification_no:String,//unique number for each book
    Date_when_reserved:Date,
    bookRef1:
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"BookReference2"
        },
    bookRef2:
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"BookReference1"
        },
        InTheHandsOfStudent:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Student"
        },
        InTheHandsOfTeacher:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Teacher"
        }
});
var Reserved_Book= mongoose.model("Reserved_Book",reserved_bookSchema);
module.exports=Reserved_Book;