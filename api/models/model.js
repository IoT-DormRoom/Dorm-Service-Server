'use strict';

var _und = require("underscore");

module.exports.hasRequiredFields = function(obj, schema) {
	return _und.chain(schema)
		.keys()
		.filter(key => schema[key].required)
		.every(key => _und.has(obj, key))
		.value();
}

module.exports.hasInvalidFields = function(obj, schema) {
	return !_und.chain(obj)
		.keys()
		.every(key => _und.has(schema, key))
		.value();
}
