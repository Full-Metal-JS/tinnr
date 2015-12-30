var recipeController = require('./recipeController.js');

module.exports = function(app) {
  app.get('/', recipeController.getAll);
  app.get('/yummly', recipeController.getYummlyData);
  app.post('/save', recipeController.saveRecipe);

};
