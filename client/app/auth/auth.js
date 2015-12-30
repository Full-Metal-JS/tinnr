angular.module('tinnr.auth', [])
  .controller('AuthController', ['$scope', '$window', '$state', 'Auth', 'User', function ($scope, $window, $state, Auth, User) {
    $scope.user = User;
    $scope.error = null;

    $scope.signin = function () {
      Auth.signin($scope.user)
        .then(function (token) { // TODO: need to return user object with token
          // $scope.user.preferences = user.preferences;
          $scope.user.password = undefined;
          $window.localStorage.setItem('com.tinnr', token);
          //$window.localStorage.setItem('com.tinnr', user.token);
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
          $scope.user.password = undefined;
          $window.localStorage.setItem('com.tinnr', token);
          $state.go('meals');
        })
        .catch(function (error) {
          $scope.error = error;
          console.error(error);
        });
    };
  }]);
