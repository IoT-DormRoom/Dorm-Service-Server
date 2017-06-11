'use strict';

var _und = require("underscore");

module.exports.foodModel = {
	name: {
		type: 'string',
		required: true
	},
	quantity: {
		type: 'number',
		required: true
	},
	category: {
		type: 'string',
		required: false
	},
	type: {
		type: 'string',
		required: false
	}
}

module.exports.verify = function(food) {
	return !hasInvalidFields(food, this.foodModel)
		&& hasRequiredFields(food, this.foodModel);
}

function hasRequiredFields(obj, schema) {
	return _und.chain(schema)
		.keys()
		.filter(key => schema[key].required)
		.every(key => _und.has(obj, key))
		.value();
}

function hasInvalidFields(obj, schema) {
	return !_und.chain(obj)
		.keys()
		.every(key => _und.has(schema, key))
		.value();
}
