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

	app.post("/api/newitems/:username", function(req, res) {
		Items.create({
			username: req.params.username,
			apples: 20,
			carrots: 20,
			cupcakes: 5,
			steaks: 5
		}).then(function(results) {
			res.json(results);
		});
	});

	app.put("/api/updateItems/:username", function(req, res) {
		Items.update({
			apples: req.body.apples,
			carrots: req.body.carrots,
			cupcakes: req.body.cupcakes,
			steaks: req.body.steaks
		}, {
			where: {
				username: req.params.username
			}
		}).then(function(result) {
			res.json(result);
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

	app.get("/api/userinfo/:id", function(req, res) {
		User.findOne({
			where: {
				id: req.params.id
			}
		}).then(function(results) {
			res.json(results);
		});
	});

	app.put("/api/assignSpiritAnimal", function(req, res){
		console.log(req.body.animal);
		User.update({
			animal: req.body.animal
		}, {
			where: {
				username: req.body.username,
				id: req.body.id
			}
		}).then(function(result) {
			res.json(result);
			console.log(result);
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

	app.post("/api/survey", function(req, res) {
		Survey.create({
			username: req.body.username,
			q1: req.body.q1, q2: req.body.q2, q3: req.body.q3, q4: req.body.q4, q5: req.body.q5,
			q6: req.body.q6, q7: req.body.q7, q8: req.body.q8, q9: req.body.q9, q10: req.body.q10
		}).then(function(results) {
			res.json(results);
		});
	});

	app.get('/user', (req, res, next) => {
	if(req.user) {
		return res.status(200).json({
			user: req.user,
			authenticated: true
		});
	} else {
		return res.status(401).json({
			error: 'User is not authenticated',
			authenticated: false
		});
	}
});
	
};