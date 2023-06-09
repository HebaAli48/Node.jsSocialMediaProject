
const AppError = require("../utils/AppError.js");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const jwt = require('jsonwebtoken');
const Post = require("../models/post.js");
const Comment = require("../models/comment.js");
const Review = require("../models/review.js");
const User = require("../models/user.js");
// const upload = require("../middlewares/multer.js")
// const cloudinary=("../utils/cloudinary.js")
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


const signup = async (req, res, next) => {
  const { username, email, password ,role} = req.body;
  // console.log({ username, email, password });

  const hashedPassword = await bcrypt.hash(password, 10);

  const userCreated = new User({ username, email, password: hashedPassword,role});
  
  if (req.file) {
    cloudinary.uploader.upload(req.file.path, async(error, result) => {
       userCreated.profilePicture =  result.url ;
      // console.log(result['secure_url'],userCreated)
      await userCreated.save();
      userCreated.password=undefined;
      // console.log(userCreated)
    
      res.send(userCreated);
    })
  }
else{
  await userCreated.save();
  userCreated.password=undefined;
  // console.log(userCreated)

  res.send(userCreated);}
};
//  const uploadedPic=upload.single('profilePicture')

const signin = async (req, res, next) => {
  const { username, email, password,role } = req.body;
  if (!email || !password)
    return next(new AppError("email and password are required"));
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new AppError("invalid credentials", 404));
  }
  const token = jwt.sign({ id:user._id }, process.env.JWT_SECRET);

 
  const ismatch = await bcrypt.compare(password, user.password);
  if (!ismatch) {
    return next(new AppError("invalid credentials", 404));
  }
  user.password = undefined;

  res.send({token,user});
};

// const getUserById = async (req, res, next) => {
//   const { id } = req.params;
//   // const getUser = await User.findById(id).populate('posts');
//   const getUser = await User.findById(id)
//   .populate({
//     path: 'posts',
//     populate: [
//       { path: 'comments', model: 'Comment' },
//       { path: 'reviews', model: 'Review' }
//     ]
//   });
//   const getUserPost = await Post.find({creatorId: id})

//   if (!getUser) {
//     return next(new AppError("User not found", 404));
//   }
//   getUser.posts = getUserPost;
//   const getPostComment = await Comment.find({ postId: getUserPost._id });
//   const getPostReviews = await Review.find({postId: getUserPost._id })
//   getUserPost.comments=getPostComment;
//   getUserPost.reviews=getPostReviews;

  
//   res.send(getUser);
// };

const getUserById = async (req, res, next) => {
  const { id } = req.params;

  // Retrieve the user and populate their posts, comments, and reviews
  const user = await User.findById(id)
    .populate({
      path: 'posts',
      populate: [
        { path: 'comments', model: 'Comment' },
        { path: 'reviews', model: 'Review' }
      ]
    });
    if (!user) {
      return next(new AppError("User not found", 404));
    }
  // Retrieve the user's posts separately
  const userPosts = await Post.find({ creatorId: id });

  // Loop through each post and retrieve its comments and reviews
  for (let i = 0; i < userPosts.length; i++) {
    const postComments = await Comment.find({ postId: userPosts[i]._id });
    const postReviews = await Review.find({ postId: userPosts[i]._id });
    userPosts[i].comments = postComments;
    userPosts[i].reviews = postReviews;
  }

  // Set the user's posts to the retrieved posts with comments and reviews
  user.posts = userPosts;



  res.send(user);
};


const getAllUsers = async (req, res) => {

  // const users = await User.find().populate('posts');
  const users = await User.find()
  .populate({
    path: 'posts',
    populate: [
      { path: 'comments', model: 'Comment' },
      { path: 'reviews', model: 'Review' }
    ]
  });

  for (let i = 0; i < users.length; i++) {
    const getUserPost = await Post.find({ creatorId: users[i]._id });
    users[i].posts = getUserPost;
    for (let j = 0; j < getUserPost.length; j++) {
      const getPostComment = await Comment.find({ postId: getUserPost[j]._id });
      const getPostReviews = await Review.find({postId: getUserPost[j]._id })
      getUserPost[j].comments=getPostComment;
      getUserPost[j].reviews=getPostReviews;
    }
   
  }

  res.send(users);
};

const updateUserById = async (req, res, next) => {
  const iD = req.params.id;

  const { username, email, password } = req.body;
  
  const userUpdated = await User.findByIdAndUpdate(iD, {
    username,
    email,
    password,
  });
  if (!userUpdated) {
    return next(new AppError("User not found", 404));
  }
  if (req.file) {
    cloudinary.uploader.upload(req.file.path,async (error, result) => {
      userUpdated.profilePicture =  result.url ;
      // console.log(result['secure_url'],userCreated)
      await userUpdated.save();
      userUpdated.password=undefined;
      // console.log(userCreated)
    
      res.send(userUpdated);
  })
  }
  // if (req.file) {
  //   const result = await cloudinary.uploader.upload(req.file.path);
  //   user.profilePicture = result.secure_url;
  // }
  else res.send(userUpdated);
};

const deleteUserById = async (req, res, next) => {
  // console.log(req.user);

  // console.log(req.user.role);
  // console.log(req.params.id);
 
  if (req.user.role=='admin') {
    const iD = req.params.id;
    const userDeleted = await User.findByIdAndDelete(iD);
    if (!userDeleted) {
      return next(new AppError("User not found", 404));
    }
    const postFinded=await Post.find({ creatorId: iD })
    console.log(postFinded);
    const postsDeleted =await Post.find({ creatorId: iD }).deleteMany();
    console.log(postsDeleted);
   for (let i=0;i<postFinded.length;i++){
    var commentsDeleted = await Comment.find({ postId: postFinded[i]._id }).deleteMany();
    var reviewsDeleted = await Review.find({ postId:  postFinded[i]._id }).deleteMany();
   }
   console.log("commentsDeleted",commentsDeleted);
   console.log("reviewsDeleted",reviewsDeleted);

    res.send({userDeleted,postsDeleted,commentsDeleted,reviewsDeleted});
  }
  else  {
    return next(new AppError("FORBIDDEN ,You are not authorized to perform this action", 403));
  }

};

module.exports = {
  signup,
  getUserById,
  getAllUsers,
  updateUserById,
  deleteUserById,
  signin};
