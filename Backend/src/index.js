const express = require('express');
const rateLimit = require('express-rate-limit');
const app = express();

const passport = require("./configs/passport")
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
 //integrating json into app and saving it from DOS ATTACKS by limiting the body

// Data Sanitization against XSS //preventing users from inserting HTML and scripts on input;

const cors = require("cors");
app.use(cors({ origin: process.env.ORIGIN, credentials: true }));
const limit = rateLimit({
    max: 2,// max requests
    windowMs: 60 * 60 * 1000, // 1 Hour
    message: 'Too many requests' // message to send
});
app.use('/social/login', limit); // Setting limiter on specific route
/////////////////////////////-----------------Google Auth------------------///////////
app.use(passport.initialize());

passport.serializeUser(function({user, token}, done) {
    done(null, {user, token});
});
  
passport.deserializeUser(function({user, token}, done) {
    done(err, {user, token});
});

app.get("/auth/google/failure", function(req, res) {
    return res.send("Something went wrong");
})

app.get('/auth/google',
  passport.authenticate('google', { scope:
      [ 'email', 'profile' ] }
));

app.get( '/auth/google/callback',
    passport.authenticate( 'google', {
        failureRedirect: '/auth/google/failure'
}), function(req, res) {
    const {user, token} = req.user;
    return res.redirect(`http://localhost:3000/googleRedirect`+"?"+token);
});


///////////////---------------------Routes ----------------------------////////////


const userController = require("./routes/user.routes");
const authController = require("./routes/auth.routes");
const postController = require('./routes/posts.routes');
const commentController = require('./routes/comments.routes');
app.use("/social",authController); //defult api to hit authController;
app.use("/social/user",userController);//defult api to hit userController;
app.use("/social/post",postController); //defult api to hit postController;
app.use("/social/comment",commentController);// default api to git commentController;
module.exports = app;
