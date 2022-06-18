const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
   title:{type:String,required:true,unique:true},
   description:{type:String,required:true},
   user:{type:mongoose.Schema.Types.ObjectId,ref:"users",required:true,unique:true,},
   categories:[{type:String,required:true}],
   likes:[{type:mongoose.Schema.Types.ObjectId}]
},{
    versionKey:false,
    timestamps:true
});

module.exports = mongoose.model("Post",PostSchema);