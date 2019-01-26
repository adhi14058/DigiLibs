var mongoose=require('mongoose');
var same_book_countSchema =new mongoose.Schema({
    Id_no:String,  // id_no as it can be both faculty as well as student bcoz its a common table
    Identification_no:String,//unique number for each book
    No_times_taken: Number,
    Date_after_book_taken:Date,
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
var Same_Book_Count= mongoose.model("Same_Book_Count",same_book_countSchema);
module.exports=Same_Book_Count;