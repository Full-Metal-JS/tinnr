angular.module('tinnr.recipesServices', [])
  .factory('Recipes', ['$http', function($http) {
    var recipes = {};

    recipes.getAll = function () {
      return $http({
        method: 'GET',
        url: '/api/recipes'
      })
      .then(function (res) {
        return res.data;
      }, function (res) {
        console.error('Error: ', res);
      });
    };

    recipes.saveRecipe = function (recipe) {
      return $http({
        method: 'POST',
        url: '/api/recipes/save',
        data: recipe
      })
      .then(function (res) {
        return res.data;
      }, function (res) {
        console.error('Error: ', res);
      });
    };

    return recipes;
  }]);

