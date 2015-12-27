angular.module('tinnr.authServices', [])
  .factory('Auth', function ($http, $state, $window) {
    var auth = {};

    auth.currentUser = {};

    auth.signin = function (user) {
      return $http({
        method: 'POST',
        url: '/api/users/signin',
        data: user
      })
      .then(function (resp) {
        if (resp.data.token) {
          auth.setCurrentUser(user.username, resp.data.token);
        }
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
        if (resp.data.token) {
          auth.setCurrentUser(user.username, resp.data.token);
        }
        return resp.data.token;
      });
    };

    auth.setCurrentUser = function (username, token) {
      auth.currentUser.username = username;
      auth.currentUser.token = token;  
    };

    auth.isAuth = function () {
      return !!$window.localStorage.getItem('com.tinnr');
    };

    auth.signout = function () {
      auth.currentUser = {};
      $window.localStorage.removeItem('com.tinnr');
      $state.go('signin');
    };

    return auth;
  });
