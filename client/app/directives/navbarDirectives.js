angular.module('tinnr.navbarDirectives', [])
  .directive('navbar', ['Auth', function(Auth) {
    return {
      restrict: 'E',
      templateUrl: 'app/partials/_navbar.html',
      controller: function($scope) {
        $scope.isLoggedIn = Auth.isAuth;
        $scope.signout = Auth.signout;
      }
    };
  }]);
