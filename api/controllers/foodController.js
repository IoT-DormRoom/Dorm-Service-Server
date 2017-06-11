'use strict';
var admin = require('firebase-admin');
var foodModel = require('../models/foodModel');
var _und = require("underscore");

var privateKey = (process.env.FIREBASE_PRIVATE_KEY).replace(/\\n/g,'\n');
var clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
admin.initializeApp({
	credential: admin.credential.cert({
		"private_key": privateKey,
		"client_email": clientEmail
	}),
	databaseURL: "https://iot-dormroom-9558c.firebaseio.com/"
});

module.exports.getAllFood = function(req, res) {
	var db = admin.database();
	var ref = db.ref('/Refrigerator/Food');
	ref.once('value', function(snapshot) {
		res.json(snapshot);
	});
}

module.exports.addFood = function(req, res) {
	var db = admin.database();
	var food = req.body;

	console.log(foodModel.verify(food));
	if (foodModel.verify(food)) {
		foodExists(food.name).then(exists => {
			if (!exists) {
				console.log("Adding " + food.name);
				var foodRef = db.ref('/Refrigerator/Food');
				foodRef.child(food.name).set(_und.omit(food, 'name'));
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

function foodExists(foodName, callback) {
	return new Promise(function(resolve, reject) {
		var db = admin.database();
		var foodRef = db.ref('Refrigerator/Food/' + foodName);
		foodRef.once('value', food => {
			resolve(food.val() != null);
		});
	});
}
