const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
   title:{type:String,required:true,unique:false},
   description:{type:String,required:true},
   user:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
   categories:{type:String,required:true},
   subCategory:{type:String,required:false}
},{
    versionKey:false,
    timestamps:true
});

module.exports = mongoose.model("Post",PostSchema);