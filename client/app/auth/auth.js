angular.module('tinnr.auth', [])
  .controller('AuthController', function ($scope, $window, $state, Auth) {
    $scope.user = {};
    $scope.error = null;

    $scope.signin = function () {
      Auth.signin($scope.user)
        .then(function (token) {
          $window.localStorage.setItem('com.tinnr', token);
          $state.go('meals');
        })
        .catch(function (error) {
          $scope.error = error;
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
          $scope.error = error;
          console.error(error);
        });
    };
  });
