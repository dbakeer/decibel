var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var PostSchema = new Schema({
  artist: { type: String, required: true },
  location: { type: String, required: true },
  show_date: { type: String, required: true },
  body: { type: String, required: true },
  attendees: { type: Number, default: 0 },
  comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}]
});

PostSchema.methods.attendance = function(cb){
  this.attendees += 1;
  this.save(cb);
};

module.exports = mongoose.model('Post', PostSchema);
