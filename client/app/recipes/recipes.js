angular.module('tinnr.recipes', [])
  .controller('RecipesController', function ($scope, Recipes, Meals) {
    $scope.currentIndex = 0;

    $scope.getRecipes = function () {
      Recipes.getAll()
        .then(function (data) {
          $scope.recipes = data;
        })
        .catch(function (error) {
          console.error('Error fetching recipes: ', error);  
        });
    };

    $scope.isCurrentRecipe = function (index) {
      return $scope.currentIndex === index;
    };

    $scope.nextRecipe = function () {
      $scope.currentIndex = ($scope.currentIndex > 0) ? --$scope.currentIndex : $scope.recipes.length - 1;
    };

    $scope.saveRecipe = function () {
      Meals.saveMeal($scope.recipes[$scope.currentIndex]);
      $scope.nextRecipe();
    };

    $scope.getRecipes();
  });
