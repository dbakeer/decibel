var mongoose = require('mongoose'),
    bcrypt   = require('bcrypt-nodejs');

var userSchema = mongoose.Schema({
  local: {
    email: String,
    password: String
  },
  facebook: {
    id: String,
    token: String,
    username: String,
    email: String,
    name: String,
    gender: String,
    picture: String
  }
});

userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', userSchema);

var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var Profile = mongoose.model('profile', {
  age: Number,
  bio: String,
  friend_type: Array,
  interests: Array
});

module.exports = Profile;
