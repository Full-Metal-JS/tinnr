angular.module('tinnr.alertsDirectives', [])
  .directive('alerts', ['Auth', function(Auth) {
    return {
      restrict: 'E',
      templateUrl: 'app/partials/_alerts.html',
      controller: function($scope, $rootScope) {
        $scope.alerts = [];

        $scope.closeAlert = function(index) {
          $scope.alerts.splice(index, 1);
        };
      }
    };
  }]);
