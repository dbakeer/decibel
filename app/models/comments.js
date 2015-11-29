var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var CommentSchema = new Schema({
  body: String,
  author: String,
  post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post'}
});

module.exports = mongoose.model('Comment', CommentSchema);
