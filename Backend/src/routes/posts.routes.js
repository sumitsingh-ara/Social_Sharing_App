const router = require("express").Router();
const Users = require("../models/users.models");
const Post = require("../models/posts.models");
const Comment = require("../models/comments.models");
const authenticate = require("../middlewares/authenticate");
//make a new post;

router.post("/newPost", async (req, res) => {
  try {
    let user = await Users.findById(req.body.user);
    //check that user trying to post is present or not in our database;
    if (!user) return res.status(400).send({ message: "User not found" });
    //if user is present proceed to create post
    if (user.accountStatus.active === false)
      return res.status(400).send({ message: "You are not allowed" });
    let post = await Post.create(req.body);

    let msg = "Post successfully created";

    return res.status(200).send({ post: post, message: msg });
  } catch (err) {
    return res.status(500).send(err);
  }
});
//get single post details
router.get("/singlePost/:id",authenticate, async (req, res) => {
  try {
    let post = await Post.findById(req.params.id).populate("user", {
      password: 0,
      _id: 0,
      email: 0,
    }); //getting the post alongwith userdata by using populate;
   //console.log(post.user,req.user,post.user.username === req.user.username,post.user.username==req.user.username,"lambada");
    if(post.user.username === req.user.username) return res.status(200).send({ post: post });
   
    if(post.postaccess === 'all') return res.status(200).send({ post: post });
    let allowed = false;
    if(post.postaccess === 'friends'){
      for(let i=0;i<post.user.friends.length; i++){
        if(post.user.friends[i].user == req.user._id){
          allowed = true;
          break
        }
      }
    }
    if(post.postaccess === 'followers'){
      for(let i=0;i<post.user.followers.length; i++){
        if(post.user.followers[i].user == req.user._id){
          allowed = true;
          break
        }
      }
    }

    if (post && allowed) return res.status(200).send({ post: post }); //if post present sending data to frontend
    throw new Error()
  } catch (err) {
    return res.status(500).send(err);
  }
});
//get all posts
router.get("/allPosts", authenticate, async (req, res) => {
  try {
    const page = +req.query.page || 1; //creating a query for user endpoints and converting string into number using plus sign & setting default to page 1 is no user input given;
    const limit = +req.query.limit || 6; //creating a query for user endpoints and converting string into number using plus sign & setting default to size 10 is no user input given;

    const offset = (page - 1) * limit; //creating a formula to get the search results in pagination according to user input given which page he wants to see the list
    let sortBy = req.query.sortBy; //getting the values from frontend;
    const filterBy = req.query.filterBy; //getting the values from frontend;
    let posts;
    let postTotalCount; //calculating the total no of posts collection.
    //if only search results are to be provided;
    function filteringPosts(posts) {
      //this function filters the posts that should be shown to the user or not like in that;
      posts = posts.filter((item) => {
        console.log("Filtering posts...")
        console.log('item',item)
        if (item.user.username == req.user.username) return item;
        if (item.postaccess === "all") return item;
        if (item.postaccess === "friends") {
          for (let i = 0; i < item.user.friends.length; i++) {
            if (item.user.friends[i].user == req.user._id) return item;
          }
        }
        if (item.postaccess === "followers") {
          for (let i = 0; i < item.user.followers.length; i++) {
            if (item.user.followers[i].user == req.user._id) return item;
          }
        }
      });
      return posts;
    }
    if (req.query.search) {
      let posts = await Post.find({
        $or: [
          { description: { $regex: req.query.search, $options: "i" } },
          { title: { $regex: req.query.search, $options: "i" } },
        ],
      })
        .populate("user", { password: 0, _id: 0, email: 0 })
        .lean()
        .exec();

        posts = req.user.admin?posts:  filteringPosts(posts)
        postTotalCount = posts.length;
        posts =posts.slice(offset,offset+limit)
      if (postTotalCount > 0)
        return res.status(200).send({ posts, postTotalCount });
      else return res.status(400).send(err);
    }
    //--------------------------------------------------------if users query only sorting at a time -----------------------------------------------------------
    if (sortBy && !filterBy) {
      switch (sortBy) {
        case "mostRecents": {
          posts = await Post.find()
            .sort({ createdAt: -1 })
            .populate("user", { password: 0, _id: 0, email: 0 })
            .lean()
            .exec();
          posts = req.user.admin?posts:  filteringPosts(posts);
          postTotalCount = posts.length;
          posts = posts.slice(offset, offset + limit);
          return res.status(200).send({ posts, postTotalCount });
        }
        case "mostViewedPosts": {
          posts = await Post.find()
            .sort({ views: -1 })
            .populate("user", {
              password: 0,
              _id: 0,
              email: 0,
            })
            .lean()
            .exec();
          posts = req.user.admin?posts:  filteringPosts(posts);
          postTotalCount = posts.length;
          posts = posts.slice(offset, offset + limit);
          return res.status(200).send({ posts, postTotalCount });
        }
        case "mostLikedPosts": {
          posts = await Post.find()
            .sort({ likes: -1 })
            .populate("user", {
              password: 0,
              _id: 0,
              email: 0,
            })
            .lean()
            .exec();
          posts = req.user.admin?posts:  filteringPosts(posts);
          postTotalCount = posts.length;
          posts = posts.slice(offset, offset + limit);
          return res.status(200).send({ posts, postTotalCount });
        }
      }
    }
    //--------------------------------------------------------if users query only filter at a time-------------------------------------------------------------
    if (filterBy && !sortBy) {
      switch (filterBy) {
        case "techInfo": {
          posts = await Post.find({ categories: "Computer Science" })
            .populate("user", { password: 0, _id: 0, email: 0 })
            .lean()
            .exec();
          posts = req.user.admin?posts:  filteringPosts(posts);
          postTotalCount = posts.length;
          posts = posts.slice(offset, offset + limit);
          return res.status(200).send({ posts, postTotalCount });
        }
        case "jokes": {
          posts = await Post.find({ categories: "Jokes" })
            .populate("user", { password: 0, _id: 0, email: 0 })
            .lean()
            .exec();
          posts = req.user.admin?posts:  filteringPosts(posts);
          postTotalCount = posts.length;
          posts = posts.slice(offset, offset + limit);
          return res.status(200).send({ posts, postTotalCount });
        }
        case "motivational": {
          posts = await Post.find({ categories: "Motivational" })
            .populate("user", { password: 0, _id: 0, email: 0 })
            .lean()
            .exec();
          posts = req.user.admin?posts:  filteringPosts(posts);
          postTotalCount = posts.length;
          posts = posts.slice(offset, offset + limit);
          return res.status(200).send({ posts, postTotalCount });
        }
        case "jobs": {
          posts = await Post.find({ categories: "Jobs" })
            .populate("user", { password: 0, _id: 0, email: 0 })
            .lean()
            .exec();
            posts = req.user.admin?posts:  filteringPosts(posts)
            postTotalCount = posts.length;
            posts =posts.slice(offset,offset+limit)
          return res.status(200).send({ posts, postTotalCount });
        }
      }
    }
    //--------------------------------------------------------if users query both filter and sorting at ame time------------------------------------------------

    if (filterBy && sortBy) {
      sortBy =
        sortBy === "mostRecents"
          ? { createdAt: -1 }
          : sortBy === "mostViewedPosts"
          ? { views: -1 }
          : sortBy === "mostLikedPosts"
          ? { likes: -1 }
          : "";
      switch (filterBy) {
        case "techInfo": {
          posts = await Post.find({ categories: "Computer Science" })
            .sort(sortBy)
            .populate("user", { password: 0, _id: 0, email: 0 })
            .lean()
            .exec();
            posts = req.user.admin?posts:  filteringPosts(posts)
            postTotalCount = posts.length;
            posts =posts.slice(offset,offset+limit)
          return res.status(200).send({ posts, postTotalCount });
        }
        case "jokes": {
          posts = await Post.find({ categories: "Jokes" })
            .sort(sortBy)
            .populate("user", { password: 0, _id: 0, email: 0 })
            .lean()
            .exec();
            posts = req.user.admin?posts:  filteringPosts(posts)
            postTotalCount = posts.length;
            posts =posts.slice(offset,offset+limit)
          return res.status(200).send({ posts, postTotalCount });
        }
        case "motivational": {
          posts = await Post.find({ categories: "Motivational" })
            .sort(sortBy)
            .populate("user", { password: 0, _id: 0, email: 0 })
            .lean()
            .exec();
            posts = req.user.admin?posts:  filteringPosts(posts)
            postTotalCount = posts.length;
            posts =posts.slice(offset,offset+limit)
          return res.status(200).send({ posts, postTotalCount });
        }
        case "jobs": {
          posts = await Post.find({ categories: "Jobs" })
            .sort(sortBy)
            .populate("user", { password: 0, _id: 0, email: 0 })
            .lean()
            .exec();
            posts = req.user.admin?posts:  filteringPosts(posts)
            postTotalCount = posts.length;
            posts =posts.slice(offset,offset+limit)
          return res.status(200).send({ posts, postTotalCount });
        }
      }
    }

    posts = await Post.find().populate("user", {
      password: 0,
      _id: 0,
      email: 0,
    });

    posts = req.user.admin?posts: filteringPosts(posts);
    postTotalCount = posts.length; //calculating the total no of posts collection.
    posts = posts.slice(offset, offset + limit);
    //will looop and check whether the user can have the post or not based on the status of filtering;

    return res.status(200).send({ posts, postTotalCount });
  } catch (err) {
    return res.status(500).send(err);
  }
});
//delete the specific posts
router.delete("/deletePost/:id", authenticate, async (req, res) => {
  try {
    let post = await Post.findById(req.params.id).lean().exec();
    if (post.user != req.user._id && !req.user.admin)
      return res.status(400).send({
        message: "You are not the authorized person to delete the post",
      });

    post = await Post.findByIdAndDelete(req.params.id);
    const comment = await Comment.deleteMany({ post: req.params.id })
      .lean()
      .exec(); //getting all the comments of that post, so when deleting a post, we will also delete all the comments done on that.
    return res.status(200).send({ message: "Post deleted successfully" });
  } catch (err) {
    return res.status(500).send(err);
  }
});
//update the description of specific post
router.patch("/singlePost/edit/:id", authenticate, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).lean().exec();
    //checking the user who have written this post is only want to make the chnanges;

    if (post.user != req.user._id)
      return res
        .status(404)
        .send({ message: "You are not authorized to edit this post" });

    let editedPost = await Post.findByIdAndUpdate(
      { _id: req.params.id },
      { description: req.body.editedData },
      { new: true }
    )
      .lean()
      .exec();

    return res.status(200).send(editedPost);
  } catch (err) {
    return res.status(500).send(err);
  }
});
//liking a post
router.patch(
  "/singlePost/like/:postId/:likerId",
  authenticate,
  async (req, res) => {
    try {
      let deta = {
        user: req.params.likerId,
      };
      let likedPost = await Post.updateOne(
        { _id: req.params.postId },
        { $push: { likes: deta } },
        { new: true }
      )
        .lean()
        .exec();

      return res.status(200).send({ message: "Post liked successfully" });
    } catch (err) {
      return res.status(500).send(err);
    }
  }
);
//-------------------------------------------------------disliking a post-----------------------------------------------------
router.patch(
  "/singlePost/dislike/:postId/:likerId",
  authenticate,
  async (req, res) => {
    try {
      if (req.user._id != req.params.likerId)
        return res
          .status(404)
          .send({ message: "You are not allowed to dislike a post" });
      const dislikedPost = await Post.updateOne(
        { _id: req.params.postId },
        { $pull: { likes: { user: req.params.likerId } } }
      )
        .lean()
        .exec();
      // console.log(dislikedPost);
      return res.status(200).send({ message: "Post disliked successfully" });
    } catch (err) {
      return res.status(500).send(err);
    }
  }
);
//Set the post views count;
router.patch("/singlePost/viewedTimes/:postId", async (req, res) => {
  try {
    let post = await Post.findById(req.params.postId);
    post = await Post.findByIdAndUpdate(req.params.postId, {
      views: post.views + 1,
    })
      .lean()
      .exec();
    return res
      .status(200)
      .send({ message: "Congratulations this post get viewed one more time" });
  } catch (err) {
    return res.status(500).send(err.message);
  }
});
//check a specific post is liked by user or not
router.get("/singlePost/likedOrNot/:postId", authenticate, async (req, res) => {
  try {
    let status = await Post.findOne(
      { _id: req.params.postId },
      { likes: { $elemMatch: { user: req.user._id } } }
    );
    if (status.likes.length > 0) return res.status(200).send({ status: true });
    else return res.status(200).send({ status: false });
  } catch (err) {
    return res.status(500).send(err);
  }
});
module.exports = router;
