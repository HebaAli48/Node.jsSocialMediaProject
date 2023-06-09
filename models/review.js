const mongoose =require('mongoose');
const { Schema } = mongoose;
const User = require('./user.js');
const Post = require('./post.js');

const reviewSchema = new Schema({
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
      },
       content: {
        type: String,
        required: true
      },
    postId: {
      type: Schema.Types.ObjectId,
      ref: 'Post',
      required: true
    },
    created_at: {
      type: Date,
    },
    updated_at: {
      type: Date,
    }
  });
  
  const Review = mongoose.model('Review', reviewSchema);
  module.exports=Review;
