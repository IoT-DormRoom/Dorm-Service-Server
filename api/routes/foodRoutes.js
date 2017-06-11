'use strict';
module.exports = function(app) {
	var food = require('../controllers/foodController');

	app.route('/food')
		.get(food.getAllFood)
		.post(food.addFood);

/*	app.route('/tasks/:foodId')
		.get(food.getFood)
		.put(food.updateFood)
		.delete(food.deleteFood);*/
};
