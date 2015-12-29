angular.module('tinnr.meals', [])
  .controller('MealsController', function ($scope, Meals) {
    $scope.meals = _.chunk(Meals.list, 4);
    $scope.offsets = 4 - (Meals.list.length % 4);

  	$scope.getMeals = function () {
  		Meal.getAll()
  			.then(function (data) {
  				$scope.meals = data;
  			})
  			.catch(function (error) {
  				console.error('Error fetching meals: ', error);
  			});
  	}
  });