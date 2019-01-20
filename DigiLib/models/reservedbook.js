var mongoose=require('mongoose');
var reserved_bookSchema =new mongoose.Schema({
    Id_no:String,  // id_no as it can be both faculty as well as student bcoz its a common table
    Identification_no:String,//unique number for each book
    Date_when_reserved:Date
});
var Reserved_Book= mongoose.model("Reserved_Book",reserved_bookSchema);
module.exports=Reserved_Book;