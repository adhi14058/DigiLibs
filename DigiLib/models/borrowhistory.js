var mongoose=require('mongoose');
var borrowhistorySchema= new mongoose.Schema({
    Identification_no:String,//unique number for each book
    Rack_id:String,
    Id_no_who_borrowed_book:String, // id_no as it can be both faculty as well as student bcoz its a common table
    Date_when_borrowed:Date,
    Actual_return_date:Date,
    Expected_return_date:Date,
    Fine:Number
});
var BorrowHistory= mongoose.model("BorrowHistory",borrowhistorySchema);
module.exports=BorrowHistory;