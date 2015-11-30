var mongoose = require('mongoose'),
    User     = require('./models/user.js'),
    Comment  = require('./models/comments.js'),
    Post     = require('./models/posts.js');


module.exports = function(server, passport) {

  // render the index page
  server.get('/', function(req, res){
    res.render('index.ejs');
  });

  // render the main page
  server.get('/main', function(req, res){
    res.render('main.ejs');
  });

  // get all users
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

  // post a new user
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

  // sign up locally
  server.get('/signup', function(req, res){
    res.render('signup.ejs', { message: req.flash('signupMessage')});
  });

  server.post('/signup', passport.authenticate('local-signup',{
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true
  }));

  // login locally
  server.get('/login', function(req, res){
    res.render('login.ejs', { message: req.flash('loginMessage')});
  });

  server.post('/login', passport.authenticate('local-login', {
    successRedirect: '/profile',
    failureRedirect: '/login',
    failureFlash: true
  }));

  // logout locally
  server.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
  });

  // the profile page
  server.get('/profile', isLoggedIn, function(req, res){
    res.render('profile.ejs', {
      user : req.user
    });
  });

  ////////////////////////////
  ///// FACEBOOK LOGIN ///////
  ////////////////////////////
  server.get('/auth/facebook', passport.authenticate('facebook', { scope:  ['email', 'public_profile', 'user_location'] }));

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
      successRedirect: '/profile',
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
    successRedirect: '/profile',
    failureRedirect: '/connect/local',
    failureFlash: true
  }));

  // FACEBOOK
  server.get('/connect/facebook', passport.authorize('facebook', { scope: ['email', 'public_profile', 'user_location']}));

  server.get('/connect/facebook/callback', passport.authorize('facebook', {
    successRedirect: '/profile',
    failureRedirect: '/'
  }));

  ////////////////////////////
  //// UNLINKING LOGINS //////
  ////////////////////////////
  server.get('/unlink/local', function(req, res){
    var user = req.user;
    user.local.username = undefined;
    user.local.password = undefined;
    user.save(function(err){
      res.redirect('/profile');
    });
  });

  server.get('/unlink/facebook', function(req, res){
    var user = req.user;
    user.facebook.token = undefined;
    user.save(function(err){
      res.redirect('/profile');
    });
  });

  server.get('/posts', function(req, res, next){
    Post.find(function(err, posts){
      if (err){
        return next(err);
      }
      res.json(posts);
    });
  });

  server.post('/posts', function(req, res, next){
    var post = new Post(req.body);

    post.save(function(err, post){
      if (err) {
        console.log(err);
        res.send({
          message: 'something went wrong'
        });
      } else {
      res.json(post);
    }
    });
  });

  server.param('post', function(req, res, next, id){
    var query = Post.findById(id);

    query.exec(function(err, post){
      if (err){
        return next(err);
      } if (!post) {
        return next(new Error('no post'));
      }

      req.post = post;
      return next();
    });
  });

  server.get('/posts/:post', function(req, res, next){
    res.json(req.post);
  });

  server.get('/posts/:post/attendance', function(req, res){
    res.json(req.post);
  });

  server.put('/posts/:post/attendance', function(req, res, next){
    req.post.attendance(function(err, post){
      if (err){
        return next(err);
      }
      res.json(post);
    });
  });

  server.get('/posts/:post/comments', function(req, res){
    res.json(req.post);
  });

  server.post('/posts/:post/comments', function(req, res, next){
    var comment = new Comment(req.body);
    comment.post = req.post;

    comment.save(function(err, comment){
      if (err){
        return next(err);
      }

      req.post.comments.push(comment);
      req.post.save(function(err, post){
        if(err){
          return next(err);
        }

        res.json(comment);
      });
    });
  });

  server.get('/posts/:post/comments/:comment', function(req, res){
    res.json(req.comment);
  });

  server.get('/comments', function(req, res, next){
    Comment.find(function(err, comments){
      if (err){
        return next(err);
      }
      res.json(comments);
    });
  });

  server.param('comment', function(req, res, next, id){
    var query = Comment.findById(id);

    query.exec(function(err, comment){
      if (err){
        return next(err);
      } if (!comment) {
        return next(new Error('no comment'));
      }

      req.comment = comment;
      return next();
    });
  });

  // server.get('/posts/:post', function(req, res, next){
  //   req.post.populate('comments', function(err, post){
  //     if (err){
  //       return next(err);
  //     }
  //     res.json(post);
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
