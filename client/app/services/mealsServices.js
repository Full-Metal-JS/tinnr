angular.module('tinnr.mealsServices', [])
  .factory('Meals', ['$http', function($http) {
    var meals = {};

    meals.list = [];

    meals.getAll = function() {
    	return meals.list;
    }
    meals.getSavedMeals = function(){
      return $http({
        method: 'GET',
        url: '/api/users/meals'
      })
      .then(function (res) {

        return res;
      }, function (res) {
        console.error('Error: ', res);
      });
    }

    meals.saveRecipe= function (meal) {
      return $http({
        method: 'POST',
        url: '/api/recipes/save',
        data: meal
      })
      .then(function (res) {
        return res.data;
      }, function (res) {
        console.error('Error: ', res);
      });
    };

    meals.saveMeal = function (meal) {
      
      console.log(meal.id)
      
      $http({
        method: 'POST',
        url: '/api/users/meals',
        data: meal
      })
      .then(function (resp) {
        /*
        if (resp.data.token) {
          auth.setCurrentUser(user.username, resp.data.token);
        }
        */
        return resp;
      });
      //meals.list.push(meal);
    };

    return meals; 
  }]);