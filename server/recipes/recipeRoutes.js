'use strict'
const { 
  getRecipes, 
  saveRecipe 
} = require('./recipeController.js');

module.exports = function(app) {
  app.get('/', getRecipes);
  app.post('/', saveRecipe);
};
