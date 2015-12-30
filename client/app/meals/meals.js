angular.module('tinnr.meals', [])
  .controller('MealsController', ['$scope', 'Meals', function ($scope, Meals) {
    $scope.cols = 4;
    $scope.meals = _.chunk(Meals.list, $scope.cols);
    $scope.offsets = $scope.cols - (Meals.list.length % $scope.cols);

  	$scope.getMeals = function () {
  		Meal.getAll()
  			.then(function (data) {
  				$scope.meals = data;
  			})
  			.catch(function (error) {
  				console.error('Error fetching meals: ', error);
  			});
  	}
  }]);