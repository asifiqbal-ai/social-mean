// load strategies
var LocalStrategy = require('passport-local').Strategy;

// load user model
var User = require('./models/User');

// load the config variables
var config = require('./config');

module.exports = function(passport) {

	// used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    // Local login
    passport.use(new LocalStrategy({ usernameField: 'email' }, function(email, password, done) {
	  User.findOne({ email: email }, function(err, user) {
	    if (!user) return done(null, false, { message: 'Email ' + email + ' not found'});
	    user.comparePassword(password, function(err, isMatch) {
	      if (isMatch) {
	        return done(null, user);
	      } else {
	        return done(null, false, { message: 'Invalid email or password.' });
	      }
	    });
	  });
	}));
}
