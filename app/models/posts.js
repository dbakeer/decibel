var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var PostSchema = new Schema({
  artist: { type: String, required: true },
  location: { type: String, required: true },
  show_date: { type: String, required: true },
  body: { type: String, required: true },
  attendees: { type: Number, default: 0 },
  comments: [{body: String}]
});

PostSchema.methods.attendance = function(cb){
  this.attendees += 1;
  this.save(cb);
};

// PostSchema.comments = function(id, cb){
//   this.findOne({
//     _id: id
//   }).populate('comments').exec(cb);
// };

module.exports = mongoose.model('Post', PostSchema);
