require("dotenv").config();
const passport = require('passport');
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
const {nanoid} = require('nanoid');
const User = require("../models/users.models");
const jwt = require("jsonwebtoken");
const newToken = (user) => {
  return jwt.sign({user}, process.env.JWT_SECRET_KEY);
}

passport.use(new GoogleStrategy({
    clientID:     process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:7448/auth/google/callback",
    userProfileURL: "https://**www**.googleapis.com/oauth2/v3/userinfo",
    passReqToCallback: true
  },
  async function(request, accessToken, refreshToken, profile, done) {
      //console.log(profile);
    const email = profile?._json?.email
    const name = profile?._json?.name.split(" ")[0]+"???"+profile?._json?.name.split(" ")[1]
    const username = profile?._json?.name.split(" ")[0]+nanoid(3);

    let user;
    try { 
      user = await User.findOne({email}).lean().exec();

      if(!user) {
        user = await User.create({
          username: username,
          email: email,
          name: name,
          password: nanoid(8)
        })
      }

      const token = newToken(user);
      return done(null, {user, token})

    } catch(err) {
      console.log("err", err)
    }
  }
));

module.exports = passport