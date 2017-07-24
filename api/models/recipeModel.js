'use strict';

var _und = require("underscore");
var model = require("./model");

module.exports.model = {
	name: {
		type: 'string',
		required: true
	},
	ingredients: {
		type: 'array',
		required: true
	}
}

module.exports.ingredient = {
	foodId: {
		type: 'string',
		required: true
	},
	quantity: {
		type: 'number',
		required: true
	}
}

module.exports.verify = function(recipe) {
	return !model.hasInvalidFields(recipe, this.model)
		&& model.hasRequiredFields(recipe, this.model);
}
