angular.module('tinnr.auth', [])
  .controller('AuthController', ['$scope', '$window', '$state', 'Auth', 'User', function ($scope, $window, $state, Auth, User) {
    $scope.user = User.data;
    $scope.error = null;

    $scope.signin = function () {
      Auth.signin($scope.user)
        .then(function (user) { 
          User.data = user;
          $window.localStorage.setItem('com.tinnr', user.token);
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
          User.data.password = null;
          $window.localStorage.setItem('com.tinnr', token);
          $state.go('meals');
        })
        .catch(function (error) {
          $scope.error = error;
          console.error(error);
        });
    };
  }]);
