const express = require('express');
const router=express.Router();
const{loginValidation,signupValidation}=require('../utils/authenticationSchema.js');
const {signup,getUserById,getAllUsers,updateUserById,deleteUserById,signin} =require('../controllers/authenticationController');
const multer = require('multer');
const verifyToken=require('../utils/verifyToken.js')
// const uploadMulter = require("../middlewares/multer.js");
const AppError = require('../utils/AppError.js');
const upload=require('../middlewares/multer.js')

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, './uploads')
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//     cb(null, file.fieldname + '-' + uniqueSuffix+".png")
//   }
// })
// const upload = multer({
//   storage: storage
// });


router.get('/',getAllUsers)

  router.get('/:id',getUserById );

  router.post('/',upload.single("profilePicture"),signupValidation, signup);

  router.post('/login',loginValidation, signin);

  router.patch('/:id',upload.single("profilePicture"),updateUserById);
  
  router.delete('/:id',verifyToken,deleteUserById)


  module.exports=router;





