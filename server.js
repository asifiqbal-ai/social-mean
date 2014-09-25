// modules =================================================
var express        = require('express');
var session        = require('express-session');
var app            = express();
var mongoose       = require('mongoose');
var passport	   = require('passport');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');

// configuration ===========================================
	
// config files
var config = require('./server/config');

var port = process.env.PORT || 3000; // set our port
mongoose.connect(config.DB); // connect to our mongoDB database (commented out after you enter in your own credentials)

require('./server/passport')(passport); // pass passport for configuration

// get all data/stuff of the body (POST) parameters
app.use(bodyParser.json()); // parse application/json 
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded

app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(express.static(__dirname + '/client')); // set the static files location /public/img will be /img for users

app.use(session({ secret: 'thisisasecret'}));
app.use(passport.initialize());
app.use(passport.session());

// routes ==================================================
require('./server/routes')(app, passport); // pass our application into our routes

// start app ===============================================
app.listen(port);	
console.log('Magic happens on port ' + port); 			// shoutout to the user
exports = module.exports = app; 						// expose app