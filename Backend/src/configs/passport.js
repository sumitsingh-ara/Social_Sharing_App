const dotenv = require('dotenv');
dotenv.config();
const passport = require('passport');
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
const {nanoid} = require('nanoid');
const User = require("../models/users.models");
const jwt = require("jsonwebtoken");

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({ //syntax to integrate own gmail with nodemailer to send emails;
    service: 'gmail',
    auth: {
           user: process.env.USER,
           pass: process.env.PASSWORD
       }
   });
const newToken = (user) => {
  return jwt.sign({user}, process.env.JWT_SECRET_KEY);
}

passport.use(new GoogleStrategy({
    clientID:process.env.GOOGLE_CLIENT_ID ,
    clientSecret:process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "https://socialsharekaro.herokuapp.com/auth/google/callback",
    userProfileURL: "https://**www**.googleapis.com/oauth2/v3/userinfo",
    passReqToCallback: true
  },
  async function(request, accessToken, refreshToken, profile, done) {
     // console.log(profile);
      //console.log(accessToken);
    const email = profile?._json?.email
    const name = profile?._json?.given_name+" "+profile?._json?.family_name;
    const username = profile?._json?.name.split(" ")[0]+nanoid(3);
    const image = profile?._json?.picture;
    let user;
    try { 
      user = await User.findOne({email}).lean().exec();

      if(!user) {
        user = await User.create({
          username: username,
          email: email,
          name: name,
          password: nanoid(8),
          profilePic: {
            image:image
          },
          accountStatus: {
            active:true,
            verified:profile?._json?.email_verified
          }
        })
        const mailOptions = {
          from: process.env.USER, // sender address
          to:email, // list of receivers
          subject: 'Account Created Successfully', // Subject line
          html: `<div> <h1>Hello ${name}</h1></div></br> <p>Welcome to our Share Karo website</>`// plain text body
        };
        transporter.sendMail(mailOptions, function (err, info) {
          if(err)
            console.log(err)
          else{
               //   console.log(info);
          }
       });
      }

      const token = newToken(user);
      return done(null, {user, token})

    } catch(err) {
      console.log("err", err)
    }
  }
));

module.exports = passport