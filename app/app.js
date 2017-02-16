

// Declare app level module which depends on views, and components
  var myApp =angular.module('myApp', [
    'ngRoute',
    'ui.bootstrap',
    'myApp.tree',
    'myApp.treeservice',
    'ui.tree',
    'nvd3'

  ]).config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');

    $routeProvider
      .when('/tree', {
        templateUrl: 'view2/tree-chart.html',
        controller: 'TreeCtrl'
      })
      .otherwise({redirectTo: '/tree'});
  }]);




