angular.module('tinnr.mealsServices', [])
  .factory('Meals', function($http) {
    var meals = {};

    meals.list = [];

    meals.getAll = function(){
    	return meals.list;
    }

    meals.saveMeal = function (meal) {
      meals.list.push(meal);
    };

    return meals; 
  });