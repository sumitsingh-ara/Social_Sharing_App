const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name:"sharekariyeji",
    api_key:"373635725368527",
    api_secret:"j3j10qnqj_uUtWWBba84zXRBxag"	
});

module.exports = cloudinary;