var User = require('./models/User');

module.exports = function(app) {

	// server routes ===========================================================
	// handle things like api calls
	// authentication routes
	app.post('/auth/signup', function(req, res) {
		//create a new user
		User.create({
			name: req.body.name,
			email: req.body.email,
			password: req.body.password
		}, function(err, user) {
			if(err)
				res.send(err);

			res.json(user);
		});
	});

	app.post('/auth/login', function(req, res) {
		//find user
		User.findOne({
			email: req.body.email,
			password: req.body.password
		}, function(err, user) {
			if(err)
				res.send(err);

			res.json(user);
		});
	});

};