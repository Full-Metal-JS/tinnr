angular.module('tinnr.meals', [])
  .controller('MealsController', ['$scope', 'Meals', function ($scope, Meals) {
    $scope.cols = 4;
    $scope.meals = [];
    $scope.offsets = $scope.cols - ($scope.meals.length % $scope.cols);

    $scope.getMeals = function() {
      Meals.getMeals()
        .then(function (res) {
          $scope.meals = _.chunk(res.data, $scope.cols);
        })
        .catch(function (error) {
          console.log('Error fetching meals', error);
        });
    };

    $scope.getMeals();
  }]);