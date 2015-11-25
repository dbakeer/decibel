////////////////////////////////////
/////////// DEPENDENCIES ///////////
////////////////////////////////////
var express      = require('express'),
    mongoose     = require('mongoose'),
    port         = process.env.PORT || 3000,
    MONGOURI     = process.env.MONGOLAB_URI || "mongodb://localhost:27017",
    dbname       = "/friendr",
    db           = mongoose.connection,
    passport     = require('passport'),
    flash        = require('connect-flash'),
    morgan       = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser   = require('body-parser'),
    session      = require('express-session'),
    server       = express();

server.use(morgan('dev'));
server.use(cookieParser());
server.use(bodyParser());

server.set('view engine', 'ejs');
server.set('views', __dirname + '/views');

mongoose.connect(MONGOURI + dbname);

db.on('error', console.error.bind(console, 'connection error'));

db.once('open', function(){
  console.log("DATABASE UP");
});

server.use(session({ secret: 'ohmygoditsasecretttt' }));
server.use(passport.initialize());
server.use(passport.session());
server.use(flash());

require('./app/routes.js')(server, passport);

server.listen(port);
console.log('HEY, LISTEN!');
