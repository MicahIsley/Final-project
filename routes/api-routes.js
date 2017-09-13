var Items = require("../models/")["Items"];
var Survey = require("../models/")["Survey"];
var User = require("../models/")["User"];
var passport = require("passport");
var LocalStrategy = require('passport-local').Strategy;

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

	app.get("/api/spiritAnimal/:username", function(req, res) {
		User.findOne({
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
		console.log("just inside of api/survey");
		// step 1 - search for user in user db
		User.findOne({username: req.body.username}, function (err, user) {
			if (err) { return done(err); }
			if (!user) { return done(null, false); }
			if (!user.verifyPassword(req.body.password)) { return done(null, false); }
			return done(null, user);
		}).then(function(results) {
			console.log("first then " + results.username);
			// step 2 - if this username isn't take, save/create user
			User.register(req.body.username, req.body.password, function(registeredUser) {
				console.log("register " + registeredUser.username);

				// add registeredUser.animal

				// step 3 - save survery results after saving user
				Survey.create({
					username: registeredUser.username,
					q1: req.body.q1, q2: req.body.q2, q3: req.body.q3, q4: req.body.q4, q5: req.body.q5,
					q6: req.body.q6, q7: req.body.q7, q8: req.body.q8, q9: req.body.q9, q10: req.body.q10
				}).then(function(results) {
					res.json(results);
				});
			})
		});

	});

	app.put("/api/assignSpiritAnimal/", function(req, res) {
		User.update({
			animal: req.body.animal
		}, {
			where: {
				username: req.body.username
			}
		}).then(function(result) {
			res.json(result);
		});
	});

	app.get("/api/login/:username/:password", function(req, res) {
		User.findOne({
			where: {
				username: req.params.username
			}
		}).then(function(results) {
		});
	});
	
};