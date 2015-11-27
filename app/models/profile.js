var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var profileSchema = newSchema({
  age: Number,
  location: String,
  gender: String,
  bio: String,
  friend_types: Object,
  interests: Object
});

module.exports = mongoose.model('Profile', profileSchema);
