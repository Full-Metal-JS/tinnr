angular.module('tinnr', [
  'tinnr.recipesServices',
  'tinnr.mealServices',
  'tinnr.landing',
  'tinnr.recipes',
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
    .state('recipes', {
      templateUrl: 'app/recipes/recipes.html',
      url: '/recipes',
      controller: 'RecipesController'
    })
    .state('meals', {
      templateUrl: 'app/meals/meals.html',
      url: '/meals',
      controller: 'MealsController'
    })
})

.run(function($rootScope, $state) {
    $rootScope.$state = $state;
});