angular.module('tinnr.auth', [])
  .controller('AuthController', function ($scope, $window, $state, Auth) {
    $scope.user = {};

    $scope.signin = function () {
      Auth.signin($scope.user)
        .then(function (token) {
          $window.localStorage.setItem('com.tinnr', token);
          $state.go('meals');
        })
        .catch(function (error) {
          console.error(error);
        });
    };

    $scope.signup = function () {
      Auth.signup($scope.user)
        .then(function (token) {
          $window.localStorage.setItem('com.tinnr', token);
          $state.go('meals');
        })
        .catch(function (error) {
          console.error(error);
        });
    };

    $scope.signout = function () {
      Auth.signout($scope.user);
    };
  });
