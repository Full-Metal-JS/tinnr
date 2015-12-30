angular.module('tinnr.recipes', [])
  .controller('RecipesController', ['$scope', 'Recipes', 'Meals', 'User', function ($scope, Recipes, Meals, User) {
    $scope.currentIndex = 0;
    $scope.recipes = [];
    $scope.attributes = [];
    $scope.preferences = User.preferences;

    $scope.getRecipes = function () {
      Recipes.getAll()
        .then(function (data) {
          $scope.recipes = data.matches;
          $scope.attributes = data.attributes;
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
  }]);
