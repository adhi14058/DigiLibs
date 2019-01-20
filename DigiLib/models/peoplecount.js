var mongoose=require('mongoose');
var no_persons_in_libSchema= new mongoose.Schema({
    Id_no:String,  // id_no as it can be both faculty as well as student bcoz its a common table
    Time_entry: Date, //time alone should be retrieved 
    Time_exit: Date,  //time alone should be retrieved 
    Date_in_lib:Date,  // date alone should be retrieved
    Current_in_status: Number //current_in_status =1 -> person currently inside library
});
var No_Persons_In_Lib= mongoose.model("No_Persons_In_Lib",no_persons_in_libSchema);
module.exports=No_Persons_In_Lib;