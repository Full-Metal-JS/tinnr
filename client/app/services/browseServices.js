angular.module('tinnr.browseServices', [])
  .factory('Browse', function($http) {
    // Gets all recipes from the server
    var getAll = function () {
      return $http({
        method: 'GET',
        url: '/recipes'
      })
      .then(function (res) {
        return res.data;
      });
    };
    return {getAll: getAll};
  });
