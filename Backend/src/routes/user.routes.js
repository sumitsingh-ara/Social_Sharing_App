const router = require("express").Router();
const User = require("../models/users.models");
const Post = require("../models/posts.models");
const Comment = require("../models/comments.models");
const bcrypt = require('bcrypt');
const authenticate =require("../middlewares/authenticate");


/////------------------------------------Crud Api for Patch----------------------------------///////////////////////////////

router.patch('/update',authenticate,async(req, res)=>{
   
    if(req.user.email === req.body.email){ //check the authenticated person email is same as the email received in body or not
         try{
            if(req.body.admin) return res.status(400).send("You are not authorsied for this")
        const userCheck = await User.findOne({email: req.body.email});

        if(!userCheck) return res.status(400).send({message: "You are not authorized to make any changes"}); 

        const id = req.user._id; //getting id of user, req.user coming after successful authentication   
        
        if(req.body.password){
            const salt = await bcrypt.genSalt(10);
        //hashing the passowrd;
        req.body.password = await bcrypt.hash(req.body.password,salt);
        }
    
        const user = await User.findByIdAndUpdate(id,{...req.user,...req.body},{new:true});

        const {password,...others} = user._doc;//avoid sending password

        return res.status(200).send({user: others});
        

    }catch(err){
        console.log(err.message);
    }
    }else{
        return res.status(500).send({message:"You can only update your account"})
    }
   
})


////////////////////---------------------------------------Deleting the ID --------------------------------////////////////////;
router.delete('/delete',authenticate,async(req, res)=>{
   
    if(req.user.email === req.body.email){ //check the authenticated person email is same as the email received in body or not
        try{
            const user = await User.findOne({email: req.body.email});
            try{
            if(user.password !== req.body.password) return res.status(400).send({message:"Something went wrong"});//check and confirm password, as someone else can try with someone's else pc to delete his ID;
                
            await Post.deleteMany({username: user.username});
            await Comment.deleteMany({username: user.username});
            await User.findOneAndDelete({email: req.body.email});
            
            return res.status(200).send({message:"User has been successfully deleted"});

            }catch(err){
                console.log(err.message);
            }
        }catch(err){
            return res.status(400).send({message:"User not found"})
        }
         
    }else{
        return res.status(500).send({message:"You are only allowed to delete your account"})
    }
   
})



//-------------------------------------Get user from token ----------------------------------;

router.get("/one",authenticate,async(req,res) =>{
    try{
        
        const user = await User.findById(req.user._id)
        if(!user) return res.status(400).send({message: "User not found"});
        const {password,...others} = req.user;
        return res.status(200).send({user:others})
    }catch(err){
        return res.status(400).send({message:"User not found"})
    }
})

///-------------------------Get all user------------------------------------------------------;
router.get("/all",async(req,res) =>{
    try{    
        const users = await User.find().lean().exec();
        
        return res.status(200).send({user:users})

    }catch(err){
        return res.status(400).send({message:"Something went wrong"})
    }
})

//--------------------------------------Get a specific user details to show on page post written by whom---?..------------------------;
router.get("/specificuser/:username",async(req,res)=>{
    try{
        let user = await User.findOne({username:req.params.username});//got the user profile details
        if(!user) return res.status(400).send({message:"User not available at the moment"});

        const {password,_id,...others} = user._doc;//destructuing to avoid sending password;

        const postCount = await Post.find({user:user._id}).countDocuments();
        const likesCount = await Post.find({user:user._id})
        let sum = 0
        let views =0;
        likesCount.forEach((item)=>{
            sum+=item.likes.length
            views+=item.views;
        })
        return res.status(200).send({...others,postCount:postCount,likesCount:sum,views:views});
        
    }catch(err){
        return res.status(500).send(err);
    }
})
module.exports = router;