
var Recipe = require('../recipes/recipeModel.js');
var Q = require('q');

/* The getSavedRecipes function is currently not used in project. It was intended to be used in the userController.js - getSavedMeals function to get the recipe objects from the saved recipe ids. */
module.exports = {
  getSavedRecipes: function(mealIds, next) {
    var savedRecipes = [];
    var findRecipe = Q.nbind(Recipe.findOne, Recipe);

    mealIds.forEach(function(mealId) {
      findRecipe({id: mealId})
        .then(function(foundRecipe) {
          if (foundRecipe) {
            savedRecipes.push(foundRecipe);
          }
        })
        .fail(function(error) {
          next(error);
        });
    });

    return savedRecipes;
  }
};
