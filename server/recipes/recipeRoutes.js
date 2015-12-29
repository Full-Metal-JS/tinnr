var recipeController = require('./recipeController.js');

module.exports = function(app) {
  app.get('/', recipeController.getAll);
  app.get('/recipes', recipeController.getAll);
  app.post('/recipes', recipeController.saveRecipe);

};
