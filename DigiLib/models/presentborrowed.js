var mongoose=require('mongoose');
var presentlyborrowSchema= new mongoose.Schema({
    Identification_no:String, //unique number for each book
    Rack_id:String,
    Id_no_who_borrowed_book:String, // id_no as it can be both faculty as well as student bcoz its a common table
    Date_when_borrowed:Date,
    Expected_return_date:Date,
    Fine:Number
});

var PresentlyBorrow=mongoose.model("PresentlyBorrow",presentlyborrowSchema);
module.exports=PresentlyBorrow;