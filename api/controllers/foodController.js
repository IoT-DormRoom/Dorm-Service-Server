'use strict';
var admin = require('firebase-admin');
var foodModel = require('../models/foodModel');
var model = require('../models/model');
var _und = require("underscore");

module.exports.getAllFood = function(req, res) {
	var db = admin.database();
	var ref = db.ref('/Refrigerator/Food');
	ref.once('value', function(snapshot) {
		res.json(snapshot);
	});
}

module.exports.getFood = function(req, res) {
	var db = admin.database();
	var ref = db.ref('/Refrigerator/Food/' + req.params.foodId);
	ref.once('value', function(snapshot) {
		res.json(snapshot);
	});
}

module.exports.updateFood = function(req, res) {
	var db = admin.database();
	var food = req.body;

	if (!model.hasInvalidFields(food, foodModel.model)) {
		foodExists(req.params.foodId).then(exists => {
			if (exists) {
				var foodRef = db.ref('/Refrigerator/Food/' + req.params.foodId);
				foodRef.update(food);
				res.status(200).jsonp({
					message: 'success'
				});
			} else {
				res.status(500).jsonp({
					error: 'Food "' + req.params.foodId + '" does not exist'
				});
			}
		});
	} else {
		res.status(500).jsonp({
			error: 'Please check submitted parameters.'
		});
	}
}

module.exports.addFood = function(req, res) {
	var db = admin.database();
	var food = req.body;

	if (foodModel.verify(food)) {
		foodExists(food.name).then(exists => {
			if (!exists) {
				var foodRef = db.ref('/Refrigerator/Food/');
				foodRef.push(food);
				res.status(200).jsonp({
					message: 'success'
				});
			} else {
				res.status(500).jsonp({
					error: 'Food "' + food.name + '" already exists'
				});
			}
		});
	} else {
		res.status(500).jsonp({
			error: 'Please check submitted parameters.'
		});
	}
}

module.exports.deleteFood = function(req, res) {
	var db = admin.database();

	foodExists(req.params.foodId).then(exists => {
		if (exists) {
			var foodRef = db.ref('/Refrigerator/Food/' + req.params.foodId);
			foodRef.remove();
			res.status(200).jsonp({
				message: 'success'
			});
		} else {
			res.status(500).jsonp({
				error: 'Food "' + req.params.foodId + '" does not exist'
			});
		}
	});
}

function foodExists(foodName, callback) {
	return new Promise(function(resolve, reject) {
		var db = admin.database();
		var foodRef = db.ref('Refrigerator/Food/' + foodName);
		foodRef.once('value', food => {
			resolve(food.val() != null);
		});
	});
}
