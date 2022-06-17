const express = require('express');
const app = express();
const cookieParser = require("cookie-parser");
const passport = require("./configs/passport")
app.use(cookieParser());
app.use(express.json()); //integrating json into app


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
    return res.redirect(`http://localhost:3000/`+"?"+token);
});


///////////////---------------------Routes ----------------------------////////////


const userController = require("./routes/user.routes");
const authController = require("./routes/auth.routes");
app.use("/blog",authController); //defult api to hit authController
app.use("/blog/user",userController);//defult api to hit userController
module.exports = app;
