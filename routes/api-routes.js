var Items = require("../models/")["Items"];
var Survey = require("../models/")["Survey"];
var passport = require("passport");

module.exports = function(app) {
	app.get("/api/:username/items", function(req, res) {
		Items.findAll({
			where: {
				username: req.params.username
			}
		}).then(function(results) {
			res.json(results);
		});
	});

	app.put("/api/:username/:item", function(req, res) {
		Items.update({
			quantity: req.body.quantity
		}, {
			where: {
				username: req.body.username,
				item: req.body.item
			}
		}).then(function(result) {
			res.json(result);
		});
	});

	app.post("/api/survey", function(req, res) {
		Survey.create({
			username: req.body.username,
			q1: req.body.q1, q2: req.body.q2, q3: req.body.q3, q4: req.body.q4, q5: req.body.q5,
			q6: req.body.q6, q7: req.body.q7, q8: req.body.q8, q9: req.body.q9, q10: req.body.q10
		});
	});

	// GET /auth/google
	//   Use passport.authenticate() as route middleware to authenticate the
	//   request.  The first step in Google authentication will involve
	//   redirecting the user to google.com.  After authorization, Google
	//   will redirect the user back to this application at /auth/google/callback
	app.get('/auth/google',
	  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));

	// GET /auth/google/callback
	//   Use passport.authenticate() as route middleware to authenticate the
	//   request.  If authentication fails, the user will be redirected back to the
	//   login page.  Otherwise, the primary route function function will be called,
	//   which, in this example, will redirect the user to the home page.
	app.get('/auth/google/callback', 
	  passport.authenticate('google', { failureRedirect: '/login' }),
	  function(req, res) {
	    res.redirect('http://localhost:8080/');

	  });
};