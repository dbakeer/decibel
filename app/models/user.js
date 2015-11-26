var mongoose = require('mongoose'),
    bcrypt   = require('bcrypt-nodejs');

var userSchema = mongoose.Schema({
  local: {
    email: String,
    password: String,
    age: Number,
    bio: String,
    friend_type: Array,
    interests: Array
  },
  facebook: {
    id: String,
    token: String,
    username: String,
    email: String,
    name: String,
    gender: String,
    location: {
      name: String
    },
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
