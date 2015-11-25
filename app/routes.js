module.exports = function(server, passport) {
  server.get('/', function(req, res){
    res.render('index.ejs');
  });

  server.get('/login', function(req, res){
    res.render('login.ejs', { message: req.flash(loginMessage)});
  });

  server.get('/signup', function(req, res){
    res.render('signup.ejs', { message: req.flash('signupMessage')});
  });

  server.get('/profile', isLoggedIn, function(req, res){
    res.render('profile.ejs', {
      user : req.user
    });
  });

  server.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
  });
};

function isLoggedIn(req, res, next) {
  if(req.isAuthenicated()){
    return next();
  } else {
    res.redirect('/');
  }
}
