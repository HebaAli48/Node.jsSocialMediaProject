const Post = require("../models/post.js");
const AppError = require("../utils/AppError.js");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const Comment = require("../models/comment.js");
const Review = require("../models/review.js");
const User = require("../models/user.js");

const createPost = async (req, res, next) => {

  // const { id } = req.params;
  // const getUser = await User.findById(id).populate('posts');
  // const getUserPost = await Post.find({creatorId: id})

  // if (!getUser) {
  //   return next(new AppError("User not found", 404));
  // }
  // getUser.posts = getUserPost;
  // res.send(getUser);

  const { title, content, creatorId} = req.body;
  
  const getUser = await User.findById(creatorId)
   if (!getUser) {
    return next(new AppError("User not found", 404));
  }
  const created_at=Date.now();
  const postCreated = await Post.create({ title, content, creatorId ,created_at});
  res.send(postCreated);
};


const getPostById = async (req, res, next) => {
  const { id } = req.params;
  const getPost = await Post.findById(id).populate('comments').populate('reviews');
  const getPostComment = await Comment.find({postId: id})
  const getPostReviews = await Review.find({postId: id})

  if (!getPost) {
    return next(new AppError("Post not found", 404));
  }
  getPost.comments=getPostComment
  getPost.reviews=getPostReviews
  res.send(getPost);
};


const getAllPosts = async (req, res) => {
  const posts = await Post.find().populate('comments').populate('reviews');
  for (let i = 0; i < posts.length; i++) {
    const getPostComment = await Comment.find({ postId: posts[i]._id });
    const getPostReviews = await Review.find({postId: posts[i]._id })
    posts[i].comments = getPostComment;
    posts[i].reviews = getPostReviews;
  }
  
  res.send(posts);
};

const updatePostById = async (req, res, next) => {
  const iD = req.params.id;

  const { title, content, creatorId } = req.body;
  const updated_at=Date.now();
  const postUpdated = await Post.findByIdAndUpdate(iD, {title, content, creatorId , updated_at});
  if (!postUpdated) {
    return next(new AppError("Post not found", 404));
  }
  res.send(postUpdated);
};

const deletePostById = async (req, res, next) => {
  const iD = req.params.id;
  const postDeleted = await Post.findByIdAndDelete(iD);
  if (!postDeleted) {
    return next(new AppError("Post not found", 404));
  }
  res.send(postDeleted);
};

const getTop5RatedPosts = async (req, res, next) => {
  try {
    const topRatedPosts = await Review.aggregate([
      // Group the reviews by postId and calculate the average rating for each group
      {
        $group: {
          _id: "$postId",
          averageRating: { $avg: "$rating" }
        }
      },
      // Sort the groups in descending order by average rating
      { $sort: { averageRating: -1 } },
      // Limit the results to the top 5 posts
      { $limit: 5 },
      // Look up the post details for each group
//       {
//         $lookup: {
//           from: "posts",
//           localField: "postId",
//           foreignField: "_id",
//           as: "postDetails"
//         }
//       },
//       {
//   $project: {
//     _id: 1,
//     title: 1,
//     content: 1,
//     creatorId: 1
//   }
// }
    ]);
    const posts = [];
    for (const post of topRatedPosts) {
      const postDetails = await Post.findOne({ _id: post._id });
      if (postDetails) {
        posts.push({
          ...post,
          postDetails: {
            _id: postDetails._id,
            title: postDetails.title,
            content: postDetails.content,
            creatorId: postDetails.creatorId
          }
        });
      }
    }
    
    res.send(posts);
    // res.send(topRatedPosts);
  } catch (err) {
    return next(new AppError("Error getting top rated posts", 500));
  }
};
module.exports = {
    createPost, getPostById, getAllPosts, updatePostById, deletePostById ,getTop5RatedPosts
};
