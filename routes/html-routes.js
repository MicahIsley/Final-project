var path = require("path");
var User = require("../models/")["User"];
var expressValidator = require("express-validator");
var bcrypt = require("bcrypt");
var passport = require("passport");
const saltRounds = 10;


module.exports = function(app) {
	app.get("/", function(req, res) {
		console.log(req.user);
		console.log(req.isAuthenticated());
		res.sendFile(path.join(__dirname + "/../public/views/landing.html"));
	});

	app.get("/animalHome", authenticationMiddleware(), function(req, res) {
		res.sendFile(path.join(__dirname + "/../public/views/animalHome.html"));
	});

	app.get("/forage", function(req, res) {
		res.sendFile(path.join(__dirname + "/../public/views/forage.html"));
	});

	app.get("/survey", function(req, res) {
		res.sendFile(path.join(__dirname + "/../public/views/survey.html"));
	});

	app.get("/training", function(req, res) {
		res.sendFile(path.join(__dirname + "/../views/training.html"));
	});

	app.post("/login", passport.authenticate(
		"local", {
			successRedirect: "/animalHome",
			failureRedirect: "/"
		}
	));

	app.get("/logout", function(req, res) {
		req.logout();
		req.session.destroy();
		res.redirect("/");
	})

	app.post("/register", function(req, res, next) {
		req.checkBody("username", "Username field cannot be empty.").notEmpty();
		req.checkBody("email", "The email you entered is invalid, please try again.").isEmail();
		//req.checkBody("reEnterPassword", "Passwords do not match, please try again.").equals(req.body.password);
		const errors = req.validationErrors();
		if (errors) {
			console.log(`errors: ${JSON.stringify(errors)}`);

			res.sendFile(path.join(__dirname + "/../public/views/landing.html"));
		} else{
			const username = req.body.username;
			const email = req.body.email;
			const password = req.body.password;

			console.log("in else statement");
			bcrypt.hash(password, saltRounds, function(err, hash){
				User.create({
				username: username,
				email: email,
				password: hash
				}).then(function(results) {
					const user_id = results.dataValues.id;
					req.login(user_id, function(err){
						res.redirect("/");
					});
				});
	
			});
		}

	});

	passport.serializeUser(function(user_id, done) {
		done(null, user_id);
	});

	passport.deserializeUser(function(user_id, done) {
		done(null, user_id);
	});

	function authenticationMiddleware() {
		return (req, res, next) => {
			console.log(`
				req.session.passport.user: ${JSON.stringify(req.session.passport)}`);

			if (req.isAuthenticated()) return next();

			res.redirect("/")
		}
	}
};