angular.module('tinnr.recipes', [])

.controller('RecipesController', function ($scope, Recipes) {
  $scope.getRecipes = function () {
    Recipes.getAll()
      .then(function (data) {
        console.log(data);
        $scope.recipes = data[2];
      })
      .catch(function (error) {
        console.error('Error fetching recipes: ', error);  
      });
  };

  $scope.getRecipes();
});