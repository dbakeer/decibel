var LocalStrategy    = require('passport-local').Strategy,
    FacebookStrategy = require('passport-facebook').Strategy,
    mongoose         = require('mongoose'),
    User             = mongoose.model('User'),
    config           = require('./auth');

module.exports = function(passport) {

    ////////////////////////////
    /////// LOCAL SIGNUP ///////
    ////////////////////////////
    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user){
          done(err, user);
        });
    });

    passport.use('local-signup', new LocalStrategy({
      usernameField: 'username',
      passwordField: 'password',
      passReqToCallback: true
    },
    function(req, username, password, done){
      process.nextTick(function(){

        User.findOne({
          'local.username' : username
        },
        function(err, user){
          if (err) {
            return done(err);
          } else if (user) {
            return done(null, false, req.flash('signupMessage', 'Username is already taken'));
          } else {
            var newUser = new User();

            newUser.local.username = username;
            newUser.local.password = newUser.generateHash(password);

            newUser.save(function(err){
              if(err) {
                throw err;
              } else {
                return done(null, newUser);
              }
            });
          }
        });
      });
    }));


    ////////////////////////////
    /////// LOCAL LOGIN ////////
    ////////////////////////////
    passport.use('local-login', new LocalStrategy({
      usernameField: 'username',
      passwordField: 'password',
      passReqToCallback: true
    },
    function(req, username, password, done) {
      User.findOne({
        'local.username' : username
      },
      function(err, user){
        if (err) {
          return done(err);
        } else if (!user) {
          return done(null, false, req.flash('loginMessage', 'No User by that username found'));
        } else if (!user.validPassword(password)) {
          return done(null, false, req.flash('loginMessage', 'Incorrect Password'));
        } else {
          return done(null, user);
        }
      });
    }
  ));



  ////////////////////////////
  ////// FACEBOOK LOGIN //////
  ////////////////////////////
  passport.use(new FacebookStrategy({

    clientID        : config.facebookAuth.clientID,
    clientSecret    : config.facebookAuth.clientSecret,
    callbackURL     : config.facebookAuth.callbackURL,
    passReqToCallback : true,
    profileFields: ['id', 'email', 'gender', 'location', 'name', 'photos']
  },

  function(req, token, refreshToken, profile, done) {

    process.nextTick(function() {
      console.log(profile);

      if (!req.user) {

        User.findOne({ 'facebook.id' : profile.id }, function(err, user) {

          if (err)
          return done(err);

          if (user) {
            if(!user.facebook.token) {
              user.facebook.token = token;
              user.facebook.name  = profile.name.givenName + ' ' + profile.name.familyName;
              user.facebook.gender = profile.gender;
              user.facebook.picture = profile.photos[0].value;

              user.save(function(err){
                if (err)
                throw err;
                return done(null, user);
              });
            }
          } else {
            var newUser = new User();

            newUser.facebook.id    = profile.id;
            newUser.facebook.token = token;
            newUser.facebook.name  = profile.name.givenName + ' ' + profile.name.familyName;
            newUser.facebook.email = profile.emails[0].value;
            newUser.facebook.gender = profile.gender;
            newUser.facebook.picture = profile.photos[0].value;

            newUser.save(function(err) {
              if (err)
              throw err;

              return done(null, newUser);
            });
          }
        });
      } else {
        var user = req.user;

        user.facebook.id    = profile.id;
        user.facebook.token = token;
        user.facebook.name  = profile.name.givenName + ' ' + profile.name.familyName;
        user.facebook.email = profile.emails[0].value;
        user.facebook.gender = profile.gender;
        user.facebook.picture = profile.photos[0].value;

        user.save(function(err) {
          if (err)
          throw err;
          return done(null, user);
        });
      }
    });
  }));
};
