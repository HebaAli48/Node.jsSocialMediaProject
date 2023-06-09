const mongoose =require('mongoose');
const { Schema } = mongoose;
const Post = require('./post');

const userSchema = new Schema({
  username: String, // String is shorthand for {type: String}
  email: {
    type:String,
		required:true,
		unique:true
},
  password: {
    type:String,
    required:true,
    select:false,

},
role: {
  type: String,
  enum:['user','admin'],
  default: 'user'
},
posts: [{
  type: Schema.Types.ObjectId,
  ref: 'Post',
}],
profilePicture: {
  type: String,
},
});

const User=mongoose.model('User',userSchema);
module.exports=User;
