angular.module('tinnr.authServices', [])
  .factory('Auth', ['$http', '$state', '$window', 'User', function ($http, $state, $window, User) {
    var auth = {};

    auth.signin = function (user) {
      return $http({
        method: 'POST',
        url: '/api/users/signin',
        data: user
      })
      .then(function (resp) {
        return resp.data.token;
      });
    };

    auth.signup = function (user) {
      return $http({
        method: 'POST',
        url: '/api/users/signup',
        data: user
      })
      .then(function (resp) {
        return resp.data.token;
      });
    };

    auth.isAuth = function () {
      return !!$window.localStorage.getItem('com.tinnr');
    };

    auth.signout = function () {
      User.clearUser();
      $window.localStorage.removeItem('com.tinnr');
      $state.go('signin');
    };

    return auth;
  }]);
