var User = require('./models/User');
var crypto = require('crypto');

module.exports = function(app, passport) {

	// server routes ===========================================================
	// handle things like api calls
	// authentication routes
	app.post('/auth/signup', function(req, res, next) {

		var user = new User({
			name: req.body.name,
			picture: gravatar(req.body.email),
			email: req.body.email,
			password: req.body.password
		});

		User.findOne({ email: req.body.email }, function(err, existingUser) {
			if(existingUser) {
				return res.json(404, {message: 'Email is in use.'});
			}
			user.save(function(err, user) {
				if(err) return next(err);
				// login later
				res.json({user: user});
			});
		});
	});

	app.post('/auth/login', function(req, res, next) {
		passport.authenticate('local', function (err, user, info) {
			if(err) return res.json(401, err);
			if (!user) return res.json(404, {message: info.message});
			
			res.json({user: user});

		})(req, res, next)
	});

	function gravatar(email) {
		  var size = 200;
		  var md5 = crypto.createHash('md5').update(email).digest('hex');
		  return 'https://gravatar.com/avatar/' + md5 + '?s=' + size + '&d=mm';
	}
};