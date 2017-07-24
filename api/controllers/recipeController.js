'use strict';
var admin = require('firebase-admin');
var recipeModel = require('../models/recipeModel');
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

module.exports.updateRecipe = function(req, res) {
	var db = admin.database();
	var recipe = req.body;

	if (!model.hasInvalidFields(recipe, recipeModel.model)) {
		recipeExists(req.params.recipeId).then(exists => {
			if (exists) {
				var recipeRef = db.ref('/Refrigerator/Recipe/' +
					req.params.recipeId);
				recipeRef.update(recipe);
				res.status(200).jsonp({
					message: 'success'
				});
			} else {
				res.status(500).jsonp({
					error: 'Recipe "' + req.params.recipeId + '" does not exist'
				});
			}
		});
	} else {
		res.status(500).jsonp({
			error: 'Please check submitted parameters.'
		});
	}
}

module.exports.addRecipe = function(req, res) {
	var db = admin.database();
	var recipe = req.body;

	if (recipeModel.verify(recipe)) {
		recipeExists(recipe.name).then(exists => {
			if (!exists) {
				var recipeRef = db.ref('/Refrigerator/Recipe/');
				recipeRef.push(recipe);
				res.status(200).jsonp({
					message: 'success'
				});
			} else {
				res.status(500).jsonp({
					error: 'Recipe "' + recipe.name + '" already exists'
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
