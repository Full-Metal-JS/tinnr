angular.module('tinnr.userServices', [])
  .factory('User', ['$http', function($http) {
    var user = {};

    user.data = {
      preferences: {}
    };

    user.savePreferences = function () {
      return $http({
        method: 'POST',
        url: '/api/user/preferences',
        data: user.data
      })
      .then(function (res) {
        return res.data;
      }, function (res) {
        console.error('Error: ', res);
      });
    };

    user.clearUser = function () {
      user.data = {
        preferences: {}
      };
    };

    return user;
  }]);
