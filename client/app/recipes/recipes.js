angular.module('tinnr.recipes', [])
  .controller('RecipesController', ['$scope', 'Recipes', 'Meals', 'Auth', 'User', function ($scope, Recipes, Meals, Auth, User) {
    $scope.currentIndex = 0;
    $scope.recipes = [];
    $scope.attributes = [];
    $scope.preferences = User.data.preferences;
    $scope.isLoggedIn = Auth.isAuth;
    $scope.alerts = [];

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

    $scope.savePreferences = function () {
      User.savePreferences()
        .then(function (data) {
          $scope.alerts.push({type: 'success', msg: 'Your preferences have been saved!'});
        })
        .catch(function (error) {
          $scope.alerts.push({type: 'danger', msg: 'Error saving preferences.'});
          console.error('Error saving preferences: ', error);  
        });
    };

    $scope.closeAlert = function(index) {
    $scope.alerts.splice(index, 1);
  };

    $scope.getRecipes();
  }]);
