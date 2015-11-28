var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
  title: String,
  artist: String,
  location: String,
  date: Date,
  body: String,
  attendance: {type: Number, default: 0},
  comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}]
});

// PostSchema.methods.attendance = function(cb){
//   this.attendance += 1;
//   this.save(cb);
// };

module.exports = mongoose.model('Post', PostSchema);
