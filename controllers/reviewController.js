const Review = require("../models/review.js");
const AppError = require("../utils/AppError.js");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const Post = require("../models/post.js");
const mongoose = require('mongoose');

const createReview = async (req, res, next) => {
  const { rating,content, postId} = req.body;
  const getPost = await Post.findById(postId)
  if (!getPost) {
   return next(new AppError("Post not found", 404));
 }
  const created_at=Date.now();
  const reviewCreated = await Review.create({ rating, content, postId ,created_at});
  res.send(reviewCreated);
};


const getReviewById = async (req, res, next) => {
  const { id } = req.params;
  const getReview = await Review.findById(id);
  if (!getReview) {
    return next(new AppError("Review not found", 404));
  }
  res.send(getReview);
};


const getAllReviews = async (req, res) => {
  // res.send('<h1>Hello users!</h1>')
  const reviews = await Review.find();
  res.send(reviews);
};

const updateReviewById = async (req, res, next) => {
  const iD = req.params.id;

  const { rating,content, postId } = req.body;
  const updated_at=Date.now();
  const reviewUpdated = await Review.findByIdAndUpdate(iD, {rating,content, postId , updated_at});
  if (!reviewUpdated) {
    return next(new AppError("Review not found", 404));
  }
  res.send(reviewUpdated);
};

const deleteReviewById = async (req, res, next) => {
  const iD = req.params.id;
  const reviewDeleted = await Review.findByIdAndDelete(iD);
  if (!reviewDeleted) {
    return next(new AppError("Review not found", 404));
  }
  res.send(reviewDeleted);
};


module.exports = {
    createReview, getReviewById, getAllReviews, updateReviewById, deleteReviewById 
};
