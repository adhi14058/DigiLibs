var mongoose=require('mongoose');

var bookReference2Schema= new mongoose.Schema({
    ISBN:String,
    Subject_id:String,
    Book_id:String,
    Rack_id:String,
    In_status:Number,//In_status = //1 -> book inside library // 0 ->borrowed //-1 lost //  2 reserved
    Date_first_inside_lib:Date, // date when its first kept inside the rack
    Identification_no:String, //unique number for each book
    InTheHandsOfStudent:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Student"
    },
    InTheHandsOfTeacher:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Teacher"
    },
    Fine:Number
  
});
var BookReference2=mongoose.model("BookReference2",bookReference2Schema);;
module.exports=BookReference2;