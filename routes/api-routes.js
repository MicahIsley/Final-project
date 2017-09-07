var Items = require("../models/")["Items"];

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
};