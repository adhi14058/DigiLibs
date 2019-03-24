var mongoose=require('mongoose');
var new_book_orderSchema = new mongoose.Schema({
    Requested_Faculty_no:String,  // faculty_no as only faculty can request a book
    Book_name:String,
    Author_name:String,
    Book_edition:String,
    Subject_name:String,
    Publisher_name:String,
    Subject_id:String,
    Book_id:String,
    Rack_id:String,
    Price:Number
    //all details added to 'bookReference1' and 'bookReference2' table
});

var New_Book_Order= mongoose.model("New_Book_Order",new_book_orderSchema);
module.exports=New_Book_Order;