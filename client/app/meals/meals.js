angular.module('tinnr.meals', [])
  .controller('MealsController', ['$scope', 'Meals', function ($scope, Meals) {
    $scope.cols = 4;
    $scope.meals = [];
    $scope.offsets = $scope.cols - ($scope.meals.length % $scope.cols);

  	$scope.getMeals = function () {
  		Meal.getAll()
  			.then(function (data) {
  				$scope.meals = data;
  			})
  			.catch(function (error) {
  				console.error('Error fetching meals: ', error);
  			});
  	}
    $scope.getMealsServer = function(){
      console.log("get meals is happening")
      Meals.getSavedMeals()
        .then(function (data){
          
          console.log("data is coming",data)
          $scope.meals = _.chunk(data.data, $scope.cols);
        })
        .catch(function (error){
          console.log('Error fetching meals', error);
        });
    }

    $scope.getMealsServer();
  }]);