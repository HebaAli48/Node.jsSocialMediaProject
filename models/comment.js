const mongoose =require('mongoose');
const { Schema } = mongoose;
const User = require('./user.js');
const Post = require('./post.js');

const commentSchema = new Schema({
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
  
  const Comment = mongoose.model('Comment', commentSchema);
  module.exports=Comment;
