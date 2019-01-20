var mongoose=require('mongoose');
var lostbooksSchema =new mongoose.Schema({
    Identification_no:String, //unique number for each book
    Id_no_who_lost_book:String, // id_no as it can be both faculty as well as student bcoz its a common table
    Fine:Number,
    Date_when_borrowed:Date,
    Date_entered_table:Date // Date on which he/she intimates loss of the book
});
var LostBooks=mongoose.model("LostBooks",lostbooksSchema);
module.exports=LostBooks;