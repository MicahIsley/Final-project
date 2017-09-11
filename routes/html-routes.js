var path = require("path");

module.exports = function(app) {
	app.get("/", function(req, res) {
		res.sendFile(path.join(__dirname + "/../public/views/landing.html"));
	});

	app.get("/animalHome", function(req, res) {
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
};