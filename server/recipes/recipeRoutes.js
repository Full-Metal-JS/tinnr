var recipeController = require('./recipeController.js');

module.exports = function(app) {
  app.get('/', recipeController.getAll);
};
