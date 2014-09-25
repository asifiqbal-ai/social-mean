// load strategies
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy  = require('passport-facebook').Strategy;

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

	// Facebook login
	passport.use(new FacebookStrategy({
		clientID: config.FB_ID,
		clientSecret: config.FB_SECRET,
		callbackURL: config.FB_CALLBACK 
	},
	function(token, refreshToken, profile, done) {
		User.findOne({ facebook: profile.id }, function(err, existingUser) {
			if(existingUser) return done(null, existingUser);
			User.findOne({ email: profile._json.email }, function(err, existingEmailUser) {
				if (existingEmailUser) {
					return done(null, false, { message: 'There is already an account using this email address.' });
				}
				else {
					var user = new User();
					user.name = profile.displayName;
					user.email = profile._json.email;
					user.facebook = profile.id;
					user.picture = 'https://graph.facebook.com/' + profile.id + '/picture?type=large';
					user.save(function(err) {
						return done(err, user);
					});
				}
			});
		});
	}));
}
