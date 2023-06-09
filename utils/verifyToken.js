const jwt = require('jsonwebtoken');
const User = require("../models/user.js");
const AppError = require("./AppError.js");


module .exports=async(req,res,next)=>{
    const token=req.headers.authorization;
    if (!token) {
      return next(new AppError("please provide token", 404));
    }
    // console.log(token);
  const {id} = jwt.verify(token,process.env.JWT_SECRET);
  const getUser = await User.findOne({_id:id});
  // console.log(getUser);
  if (!getUser) {
    return next(new AppError("invalid token", 404));
  }
  // console.log(getUser);
  req.user=getUser;
  next();
  }