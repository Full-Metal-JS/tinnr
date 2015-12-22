angular.module('tinnr', [
  'tinnr.browseServices',
  'tinnr.mealServices',
  'tinnr.landing',
  'tinnr.browse',
  'tinnr.meals',
  'ui.router',
  'ui.bootstrap'
])

.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('landing', {
      templateUrl: 'app/landing/landing.html',
      url: '/',
      controller: 'LandingController'
    })
    .state('meals', {
      templateUrl: 'app/meals/meals.html',
      url: '/meals',
      controller: 'MealsController'
    })
    .state('browse', {
      templateUrl: 'app/browse/browse.html',
      url: '/browse',
      controller: 'BrowseController'
    });
})

.run(function($rootScope, $state) {
    $rootScope.$state = $state;
});