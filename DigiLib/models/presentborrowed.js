var mongoose=require('mongoose');
var presentlyborrowSchema= new mongoose.Schema({
    Identification_no:String, //unique number for each book
    Rack_id:String,
    Date_when_borrowed:Date,
    Expected_return_date:Date,
    InTheHandsOfStudent:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Student"
    },
    InTheHandsOfTeacher:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Teacher"
    },
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

    Fine:Number
});

var PresentlyBorrow=mongoose.model("PresentlyBorrow",presentlyborrowSchema);
module.exports=PresentlyBorrow;