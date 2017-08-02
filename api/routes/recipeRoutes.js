'use strict';
module.exports = function(app) {
	var recipe = require('../controllers/recipeController');

	app.route('/recipe')
		.get(recipe.getAllRecipe)
		.post(recipe.addRecipe);

	app.route('/recipe/:recipeId')
		.get(recipe.getRecipe)
		.put(recipe.updateRecipe)
		.delete(recipe.deleteRecipe);

	app.route('/recipe/:recipeId/canMake')
		.get(recipe.canMakeRecipe);

	app.route('/recipe/:recipeId/make')
		.put(recipe.makeRecipe);
};
