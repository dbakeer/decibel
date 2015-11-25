module.exports = function(server, passport) {
  server.get('/', function(req, res){
    res.render('index.ejs');
  });

  ////////////////////////////
  /////// LOCAL LOGIN ////////
  ////////////////////////////
  server.get('/signup', function(req, res){
    res.render('signup.ejs', { message: req.flash('signupMessage')});
  });

  server.post('/signup', passport.authenticate('local-signup',{
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true
  }));

  server.get('/login', function(req, res){
    res.render('login.ejs', { message: req.flash('loginMessage')});
  });

  server.post('/login', passport.authenticate('local-login', {
    successRedirect: '/profile',
    failureRedirect: '/login',
    failureFlash: true
  }));

  server.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
  });

  server.get('/profile', isLoggedIn, function(req, res){
    res.render('profile.ejs', {
      user : req.user
    });
  });

  ////////////////////////////
  ///// FACEBOOK LOGIN ///////
  ////////////////////////////
  server.get('/auth/facebook', passport.authenticate('facebook',
  {
    scope: 'email'
  }));

  server.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
      successRedirect: '/profile',
      failureRedirect: '/'
    }));

  server.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
  });
};

function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()){
    return next();
  } else {
    res.redirect('/');
  }
}
