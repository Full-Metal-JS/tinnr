var Recipe = require('../recipes/recipeModel.js');
var Q = require('q');


module.exports = {
  getSavedRecipes: function(mealIds, next) {
    var savedRecipes = [];
    var findRecipe = Q.nbind(Recipe.findOne, Recipe);

    mealIds.forEach(function(mealId) {
      findRecipe({id: mealId})
        .then(function(foundRecipe) {
          savedRecipes.push(foundRecipe);
        })
        .fail(function(error) {
          next(error);
        });
    });

    return savedRecipes;
  }
};
