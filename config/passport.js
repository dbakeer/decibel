var LocalStrategy    = require('passport-local').Strategy,
    FacebookStrategy = require('passport-facebook').Strategy,
    User             = require('../app/models/user'),
    config           = require('./auth');

module.exports = function(passport) {

    ////////////////////////////
    /////// LOCAL SIGNUP ///////
    ////////////////////////////
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user){
          done(err, user);
        });
    });

    passport.use('local-signup', new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true
    },
    function(req, email, password, done){
      process.nextTick(function(){

        User.findOne({
          'local.email' : email
        },
        function(err, user){
          if (err) {
            return done(err);
          } else if (user) {
            return done(null, false, req.flash('signupMessage', 'Email is already taken'));
          } else {
            var newUser = new User();

            newUser.local.email = email;
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
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true
    },
    function(req, email, password, done) {
      User.findOne({
        'local.email' : email
      },
      function(err, user){
        if (err) {
          return done(err);
        } else if (!user) {
          return done(null, false, req.flash('loginMessage', 'No User by that e-mail found'));
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
              user.facebook.location = profile.user_location;

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
            newUser.facebook.location = profile.user_location;

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
        user.facebook.location = profile.user_location;

        user.save(function(err) {
          if (err)
          throw err;
          return done(null, user);
        });
      }
    });
  }));
};
