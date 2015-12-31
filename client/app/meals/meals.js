angular.module('tinnr.meals', [])
  .controller('MealsController', ['$scope', 'Meals', function ($scope, Meals) {
    $scope.cols = 1;
    $scope.meals = _.chunk(Meals.list, $scope.cols);
    $scope.offsets = $scope.cols - (Meals.list.length % $scope.cols);

  	
    $scope.getMealsServer = function(){
      Meals.getSavedMeals()
        .then(function (res){
          $scope.meals = res.data;
          console.dir($scope.meals)
        })
        .catch(function (error){
          console.log('Error fetching meals', error);
        });
    }
  }]);