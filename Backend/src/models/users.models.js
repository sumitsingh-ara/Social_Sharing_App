const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");
const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minLength: 8, maxLength: 20 },
    socialLinks: {
      linkedin: { type: String, required: false,default:"" },
      instagram: { type: String, required: false,default:"" },
      github: { type: String, required: false,default:""},
      twitter: { type: String, required: false,default:""}
    },
    profilePic: {
      public_id: { type: String, required: false, unique: true,default:null },
      image: { type: String, required: false,default:null },
    },
    admin: { type: Boolean, required: false, default: false },
    accountStatus:{
      active:{type:Boolean,required:true,default:false},
      verified:{type:Boolean,required:false,default:false}
    }
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

//create and update the password hashing;

UserSchema.pre("save", function (next) {
  if (!this.isModified("password")) return next();

  const hash = bcryptjs.hashSync(this.password, 8);
  this.password = hash;

  return next();
});

UserSchema.methods.checkPassword = function (password) {
  const match = bcryptjs.compareSync(password, this.password);

  return match;
};

module.exports = mongoose.model("User", UserSchema);
