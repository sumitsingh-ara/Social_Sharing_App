const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
   title:{type:String,required:true,unique:false},
   description:{type:String,required:true},
   user:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
   categories:{type:String,required:true},
   postaccess:{type:String,required:true},
   likes:[{user:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true}}],
   views:{type:Number,default:0}
},{
    versionKey:false,
    timestamps:true
});

module.exports = mongoose.model("Post",PostSchema);