const router = require("express").Router();
const Users = require("../models/users.models");
const Post = require("../models/posts.models");

//make a new post;

router.post("/newPost", async (req, res) => {
  try {
    let user = await Users.findById(req.body.user);
    //check that user trying to post is present or not in our database;
    if (!user) return res.status(400).send({ message: "User not found" });

    //if user is present proceed to create post

    let post = await Post.create(req.body);

    let msg = "Post successfully created";

    return res.status(200).send({ post: post, message: msg });
  } catch (err) {
    return res.status(500).send(err);
  }
});

router.get('/singlePost/:id',async(req,res)=>{

    try{
        let post = await Post.findById(req.params.id).populate("user",{ password: 0 ,_id:0,email:0});//getting the post alongwith userdata by using populate;

       if(!post) return res.status(400).send({message: "Post Not available"})
        if(post) return res.status(200).send({post:post});//if post present sending data to frontend
    }catch(err){
        return res.status(500).send({message:"Post Not found"});
    }
})

router.get('/allPosts',async(req,res)=>{
    try{

        let posts = await Post.find().populate("user",{password:0,_id:0,email:0});

        return res.status(200).send({posts:posts});
    }catch(err){
        return res.status(500).send(err);
    }
})

router.delete('/deletePost/:id/:userId',async(req,res) => {
    try{

        let post = await Post.findById(req.params.id).populate("user");
        if(post.user.id !== req.params.userId) return res.status(400).send({message: "You are not the authorized person to delete the post"});

        post = await Post.findByIdAndDelete(req.params.id);
        return res.status(200).send({message: "Post deleted successfully"});
    }catch(err) {
        return res.status(500).send(err);
    }
})
module.exports = router;
