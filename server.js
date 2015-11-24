////////////////////////////////////
/////////// DEPENDENCIES ///////////
////////////////////////////////////
var PORT           = process.env.PORT || 3000,
    MONGOURI       = process.env.MONGOLAB_URI || "mongodb://localhost:27017",
    dbname         = "/friendr",
    mongoose       = require('mongoose'),
    express        = require('express'),
    server         = express(),
    bodyParser     = require('body-parser'),
    morgan         = require('morgan'),
    methodOverride = require('method-override');

server.use(express.static('./public'));

server.use(morgan('dev'));
server.use(express.static('./public'));

server.use(methodOverride('_method'));

server.use(bodyParser.urlencoded({ extended: true }));


module.exports = server;

server.use(express.static('./public'));

server.use(morgan('dev'));
server.use(methodOverride('_method'));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended:true}));
server.use(bodyParser.text());
server.use(bodyParser.json({type: 'application/vnd.api+json'}));

module.exports = server;

mongoose.connect(MONGOURI + dbname);

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error'));

db.once('open', function(){
  console.log("DATABASE UP");
});

server.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, server.settings.env);
});

// server.get('/', function(req, res){
//   res.render('index');
// });

server.get('/*', function(req, res) {
	// If the forwarded protocol isn't HTTPS, send a redirection
	if (req.headers["x-forwarded-proto"] != "https")
		// Always redirect to /. This is a single-page application
		// meaning users have only one URL they need to access
		// directly. Any changes on that page to display information
		// will be handled by client-side JavaScript
		res.redirect("https://" + req.headers.host + "/");
	else {  // Actually serve the request file

		// Get the path. req.params[0] is the first wildcard in the
		// file path. In the case, the file path in the get command
		// is "/*", so it is everything after the initial slash.
		//
		// If there is nothing there, then the user just asked
		// for the website, and we need to insert the index.html
		// file.
		var path = req.params[0] ? req.params[0] : 'index.html';

		// Actually send the file from the public directory.
		res.sendFile(path, {root: './public'});
	}
});
