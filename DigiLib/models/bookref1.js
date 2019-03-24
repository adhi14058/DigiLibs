var mongoose=require('mongoose');

var bookReference1Schema= new mongoose.Schema({
    ISBN:String,
    Subject_name:String,
    Book_name:String,
    Book_edition:String,
    Author_name:String,
    Publisher_name:String,
    Price:Number,
    Image:String,
    No_books_bought:Number,
    No_books_present:Number,
    No_books_lost:Number,
    No_books_borrowed:Number,
    No_books_reserved:Number,
    No_books_inside_library:Number,
    No_times_book_borrowed:Number,
    ReserveCount:Number //0-->not reserved     //add 1 on each reserve 
});
var BookReference1=mongoose.model("BookReference1",bookReference1Schema);
module.exports=BookReference1;