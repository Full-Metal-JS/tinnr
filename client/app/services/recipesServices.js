angular.module('tinnr.recipesServices', [])
  .factory('Recipes', function($http) {
    // Gets all recipes from the server
    var getAll = function () {
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
    return {getAll: getAll};
  });

