'use strict';
var admin = require('firebase-admin');
var foodModel = require('../models/foodModel');
var model = require('../models/model');
var _und = require("underscore");

module.exports.getAllRecipe = function(req, res) {
	var db = admin.database();
	var ref = db.ref('/Refrigerator/Recipe');
	ref.once('value', function(snapshot) {
		res.json(snapshot);
	});
}

module.exports.getRecipe = function(req, res) {
	var db = admin.database();
	var ref = db.ref('/Refrigerator/Recipe/' + req.params.recipeId);
	ref.once('value', function(snapshot) {
		res.json(snapshot);
	});
}

module.exports.updateFood = function(req, res) {
}

module.exports.addFood = function(req, res) {
}

module.exports.deleteFood = function(req, res) {
}

function recipeExists(recipeName, callback) {
	return new Promise(function(resolve, reject) {
		var db = admin.database();
		var recipeRef = db.ref('Refrigerator/Recipe/' + recipeName);
		recipeRef.once('value', recipe => {
			resolve(recipe.val() != null);
		});
	});
}
