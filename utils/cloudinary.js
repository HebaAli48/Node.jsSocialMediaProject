const cloudinary = require("cloudinary").v2;
const multer = require("multer");
require('dotenv').config()
try {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
  });
} catch (err) {
  console.error(err);
}
  module.exports = cloudinary ;
