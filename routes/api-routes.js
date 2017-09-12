var Items = require("../models/")["Items"];
var Survey = require("../models/")["Survey"];
var User = require("../models/")["User"];
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
		Survey.create({
			username: req.body.username,
			q1: req.body.q1, q2: req.body.q2, q3: req.body.q3, q4: req.body.q4, q5: req.body.q5,
			q6: req.body.q6, q7: req.body.q7, q8: req.body.q8, q9: req.body.q9, q10: req.body.q10
		}).then(function(results) {
			res.json(results);
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
				username: req.params.username,
				password: req.params.password
			}
		}).then(function(results) {
			if(results.dataValues.username === req.params.username && results.dataValues.password === req.params.password){
				location.href = "/animalHome";
			} else{}
		});
	});

	app.get("/login", function(req, res) {

	});
	
	app.post("/login",
		passport.authenticate("local", { failureRedirect: "/login" }),
		function(req, res) {
			res.redirect("/");
		});
};