angular.module('tinnr.mealServices', [])
  .factory('Meals', function($http) {
    var meals = {};

    meals.list = [];

    meals.addMeal = function (meal) {
      meals.list.push(meal);
    };

    return meals; 
  });