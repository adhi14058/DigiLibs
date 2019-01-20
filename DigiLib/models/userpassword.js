var mongoose=require('mongoose');
var passportLocalMongoose=require('passport-local-mongoose');

var userSchema = new mongoose.Schema({
    username:String,
    password:String,
    student:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Student"
    },
    teacher:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Teacher"
    }
})
userSchema.plugin(passportLocalMongoose);
var User = mongoose.model('user',userSchema)

module.exports=User