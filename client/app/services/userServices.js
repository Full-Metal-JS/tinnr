angular.module('tinnr.userServices', [])
  .factory('User', function () {
    var user = {};

    user.preferences = {};

    user.clearUser = function () {
      user.username = undefined;
      user.token = undefined;
      user.preferences = {};
    }

    return user;
  });
