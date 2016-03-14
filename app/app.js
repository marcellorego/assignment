'use strict';

//,'myApp.version'

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.home',
  'myApp.dashboard',
  'myApp.uptime',
  'myApp.radial',
  'n3-line-chart'
]).

constant("serviceConfig", {
    "urlbase": "/app/mock"
}).

config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/home'});
}]);
