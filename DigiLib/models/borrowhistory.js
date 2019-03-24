var mongoose=require('mongoose');
var borrowhistorySchema= new mongoose.Schema({
    Identification_no:String,//unique number for each book
    Rack_id:String,
    Date_when_borrowed:Date,
    Actual_return_date:Date,
    Expected_return_date:Date,
    Fine:Number,
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
        }
});
var BorrowHistory= mongoose.model("BorrowHistory",borrowhistorySchema);
module.exports=BorrowHistory;