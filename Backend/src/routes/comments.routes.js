const router = require("express").Router();
const authenticate =require("../middlewares/authenticate");
const Comment = require("../models/comments.models");

//make a new comment;

router.post('/newcomment',authenticate,async(req,res)=>{
    if(req.user._id == req.body.user){
        try{
            //if(!req.body.comment) return res.status(400).send({message:"You can't make an empty comment"});

            let comment = await Comment.create(req.body);

            return res.status(200).send({message:"Commented Successfully",status:true})
          
        }catch(err){
            return res.status(500).send({err:err.message,status:false})
        }
    }else{
        return res.status(400).send({message:"You can't comment without login",status:false})
    }
})

//get all comments of a specific post;

router.get('/allcomments/:postId',async(req,res)=>{
    try{
        let comments = await Comment.find({post:req.params.postId}).populate("user",{password:0,email:0,_id:0}).lean().exec();
        return res.status(200).send({comments:comments,count:comments.length})
    }catch(err){
        return res.status(500).send({err:err.message,status:false})
    }
})

router.delete('/singlecomment/delete',authenticate,async(req,res)=>{
    try{
        let comment = await Comment.findById(req.body.id).lean().exec();
        if(comment.user != req.user._id) return res.status(400).send({message:"You are not authorized to delete the comment",status:false})

        comment = await Comment.findByIdAndDelete(req.body.id);

        return res.status(200).send({message:"Comment deleted successfully",status:true})
    }catch(err){
        return res.status(500).send({message:"Comment not available"})
    }
})

router.patch('/singlecomment/update',authenticate,async(req,res)=>{
    try{
        const comment = await Comment.findById(req.body.id).lean().exec();
        if(req.user._id != comment.user) return res.status(400).send({message:"You are not authorised to edit this comment",status:false});

        const commentupdate  = await Comment.findByIdAndUpdate(req.body.id,{comment:req.body.newcomment},{new:true}).lean().exec();

        return res.status(200).send({message:"Updated Successfully",status:true,comment:commentupdate})
    }catch(err){
        return res.status(500).send({message:"Not authorized or comment not available",status:false})
    }
})

module.exports = router;