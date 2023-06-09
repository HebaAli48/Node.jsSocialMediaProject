const Comment = require("../models/comment.js");
const AppError = require("../utils/AppError.js");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const Post = require("../models/post.js");

const createComment = async (req, res, next) => {
  const { title, content, postId} = req.body;
  const getPost = await Post.findById(postId)
   if (!getPost) {
    return next(new AppError("Post not found", 404));
  }
  const created_at=Date.now();
  const commentCreated = await Comment.create({ title, content, postId ,created_at});
  res.send(commentCreated);
};


const getCommentById = async (req, res, next) => {
  const { id } = req.params;
  const getComment = await Comment.findById(id);
  if (!getComment) {
    return next(new AppError("Comment not found", 404));
  }
  res.send(getComment);
};


const getAllComments = async (req, res) => {
  // res.send('<h1>Hello users!</h1>')
  const comments = await Comment.find();
  res.send(comments);
};

const updateCommentById = async (req, res, next) => {
  const iD = req.params.id;

  const { title, content, postId } = req.body;
  const updated_at=Date.now();
  const commentUpdated = await Comment.findByIdAndUpdate(iD, {title, content, postId , updated_at});
  if (!commentUpdated) {
    return next(new AppError("Comment not found", 404));
  }
  res.send(commentUpdated);
};

const deleteCommentById = async (req, res, next) => {
  const iD = req.params.id;
  const commentDeleted = await Comment.findByIdAndDelete(iD);
  if (!commentDeleted) {
    return next(new AppError("Comment not found", 404));
  }
  res.send(commentDeleted);
};

module.exports = {
    createComment, getCommentById, getAllComments, updateCommentById, deleteCommentById 
};
