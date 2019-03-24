var mongoose=require('mongoose');
var new_book_requestSchema =new mongoose.Schema({
    Faculty_no:String,  // faculty_no as only faculty can request a book
    Book_name:String,
    Author_name:String,
    Book_edition:String,
    Subject_name:String,
    Publisher_name:String,
    Accept_or_Deny:Number // initialised with -1 when row is created
});
var New_Book_Request= mongoose.model("New_Book_Request",new_book_requestSchema);
module.exports=New_Book_Request;