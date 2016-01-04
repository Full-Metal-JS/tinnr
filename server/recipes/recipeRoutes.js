var recipeController = require('./recipeController.js');

module.exports = function(app) {
  app.get('/', recipeController.getRecipes);
  app.post('/', recipeController.saveRecipe);
};
