var mongoose = require('mongoose'),
    User     = require('./models/user.js');

module.exports = function(server, passport) {
  server.get('/', function(req, res){
    res.render('index.ejs');
  });

  server.get('/users', function(req, res){
    var query = User.find({});

    query.exec(function(err, users){
      if (err) {
        res.send(err);
      } else {
        res.json(users);
      }
    });
  });

  server.post('/users', function(req, res){
    var newUser = new User(req.body);

    newUser.save(function(err){
      if(err){
        res.send(err);
      } else {
        res.json(req.body);
      }
    });
  });

  ////////////////////////////
  /////// LOCAL LOGIN ////////
  ////////////////////////////
  server.get('/signup', function(req, res){
    res.render('signup.ejs', { message: req.flash('signupMessage')});
  });

  server.post('/signup', passport.authenticate('local-signup',{
    successRedirect: '/main',
    failureRedirect: '/signup',
    failureFlash: true
  }));

  server.get('/login', function(req, res){
    res.render('login.ejs', { message: req.flash('loginMessage')});
  });

  server.post('/login', passport.authenticate('local-login', {
    successRedirect: '/main',
    failureRedirect: '/login',
    failureFlash: true
  }));

  server.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
  });

  server.get('/main', isLoggedIn, function(req, res){
    res.render('main.ejs', {
      user : req.user
    });
  });

  server.get('/form', isLoggedIn, function(req, res){
    res.render('form.ejs', {
      user : req.user
    });
  });

  ////////////////////////////
  ///// FACEBOOK LOGIN ///////
  ////////////////////////////
  server.get('/auth/facebook', passport.authenticate('facebook', { scope:  'email' }));

  server.get('/auth/facebook',
  passport.authenticate('facebook', {
    authType: 'rerequest',
    scope: 'email'
  }));

  server.get('/auth/facebook', passport.authenticate('facebook', {
    authType: 'reauthenicate',
    authNonce: 'foo123'
  }));

  server.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
      successRedirect: '/main',
      failureRedirect: '/'
    }));

  server.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
  });

  ////////////////////////////
  ///// LINKING LOGINS ///////
  ////////////////////////////

  // LOCAL
  server.get('/connect/local', function(req, res){
    res.render('connect-local.ejs', { message: req.flash('loginMessage') });
  });

  server.post('/connect/local', passport.authenticate('local-signup', {
    successRedirect: '/main',
    failureRedirect: '/connect/local',
    failureFlash: true
  }));

  // FACEBOOK
  server.get('/connect/facebook', passport.authorize('facebook', { scope: ['email', 'public_profile', 'user_location']}));

  server.get('/connect/facebook/callback', passport.authorize('facebook', {
    successRedirect: '/main',
    failureRedirect: '/'
  }));

  ////////////////////////////
  //// UNLINKING LOGINS //////
  ////////////////////////////
  server.get('/unlink/local', function(req, res){
    var user = req.user;
    user.local.email = undefined;
    user.local.password = undefined;
    user.save(function(err){
      res.redirect('/main');
    });
  });

  server.get('/unlink/facebook', function(req, res){
    var user = req.user;
    user.facebook.token = undefined;
    user.save(function(err){
      res.redirect('/main');
    });
  });

  server.get('/users/:id', function(req, res){
    var id = req.body.user;
    var query = User.findOne({});

    query.exec(function(err, user){
      if (err) {
        res.send(err);
      } else {
        res.json(user);
      }
    });
  });



  // server.get('/info', function(req, res){
  //
  //   query.exec(function(err, users){
  //     if (err) {
  //       res.send(err);
  //     } else {
  //       res.json(users);
  //     }
  //   });
  // });
  //
  // server.post('/info', function(req, res){
  //   var newInfo = new Info(req.body);
  //   console.log(req.body);
  //   console.log(res);
  //
  //   newInfo.save(function(err){
  //     if(err){
  //       res.send(err);
  //       console.log(err);
  //     } else {
  //       res.json(req.body);
  //     }
  //   });
  // });

};

function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()){
    return next();
  } else {
    res.redirect('/');
  }
}
