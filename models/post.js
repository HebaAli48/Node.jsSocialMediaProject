const mongoose = require('mongoose');
const { Schema } = mongoose;

const postSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  creatorId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  created_at: {
    type: Date,
  },
  updated_at: {
    type: Date,
  },
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment',
  }],
    reviews: [{
    type: Schema.Types.ObjectId,
    ref: 'Review',
  }]
});

const Post = mongoose.model('Post', postSchema);
module.exports=Post;
