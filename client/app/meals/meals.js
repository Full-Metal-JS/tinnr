angular.module('tinnr.meals', [])
  .controller('MealsController', function ($scope, Meals) {

  	$scope.getMeals = function (){
  		Meal.getAll()
  			.then(function(data){
  				$scope.meals = data;
  			})
  			.catch(function (error){
  				console.error('Error fetching meals: ', error)
  			})


  	}

  });