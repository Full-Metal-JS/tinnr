angular.module('tinnr', [
  'tinnr.browseServices',
  'tinnr.mealServices',
  'tinnr.meals',
  'ui.router'
])

.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('landing', {
      templateUrl: 'app/landing/landing.html',
      url: '/',
      controller: 'landingController'
    })
    .state('meals', {
      templateUrl: 'app/meals/meals.html',
      url: '/meals',
      controller: 'mealsController'
    })
    .state('browse', {
      templateUrl: 'app/browse/browse.html',
      url: '/browse',
      controller: 'browseController'
    });
});