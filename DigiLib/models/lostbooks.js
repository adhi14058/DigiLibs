var mongoose=require('mongoose');
var lostbooksSchema =new mongoose.Schema({
    Identification_no:String, //unique number for each book
    Fine:Number,
    Date_when_borrowed:Date,
    Date_entered_table:Date, // Date on which he/she intimates loss of the book
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
var LostBooks=mongoose.model("LostBooks",lostbooksSchema);
module.exports=LostBooks;