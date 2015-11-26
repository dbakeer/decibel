var mongoose = require('mongoose'),
    Schema   = mongoose.Schema,
    User     = require('./user.js');

var Profile = mongoose.model('profile', {
  age: Number,
  bio: String,
  friend_type: Array,
  interests: Array
});

module.exports = Profile;
