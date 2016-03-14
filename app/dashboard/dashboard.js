'use strict';

angular.module('myApp.dashboard', ['ngRoute', 'myApp.podservice', 'n3-line-chart', 'ngAnimate'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/dashboard', {
    templateUrl: 'dashboard/dashboard.html',
    controller: 'DashboardCtrl'
  });
}])

.controller('DashboardCtrl', ['$scope', '$timeout', 'PodService', function($scope, $timeout, PodService) {
    
    $scope.options = {
      tooltip: {
        mode: "scrubber",
        interpolate: false,
        formatter: function(x, y, series, raw) {
            return x + ": " + y;
        }
      },
      series: [{
          axis: "y",
          dataset: "dataset0",
          key: "val",
          label: "CPU usage",
          interpolation: {mode: 'cardinal', tension: 0.7},
          color: "#800070",
          type: ['line', 'dot', 'area']
        }
      ],
      axes: {
          x: {
            key: "x",
            grid: false
          },
          y: {
            grid: false
          },
          y2: {
            grid: false
          }
      },
      margin: {
        left: -1,
        top: 0,
        right: 0,
        bottom: 1
      },
      grid: {
        x: false,
        y: false,
        y2: false
      }
    };
    
    $scope.doListProcesses = function() {
        PodService.listProcesses()
        .then(function(data) {
           $scope.pods = data;
        });
    };
    
    $scope.isActive = function(process) {
        return process.active;
    };
    
    $scope.toggleProcess = function(process) {
        process.active = !process.active;
        //console.log(process.processNumber);
    }
    
    $scope.addProcess = function() {
        var pods = $scope.pods || [];
        
        pods.push({
            "active":true,
            "processNumber": ($scope.pods.length + 1),
            "cpu" : 0,
            "status": false,
            "instances" : 4,
            "memory" : {
                "total" : 128,
                "used" : 0
            },
            "restarts" : [
            ],
            "data" : {
                "dataset0": [                
                ]
            }    
        });
    }
    
    $scope.$on('$viewContentLoaded', function() {
        $timeout(function() {
            $( ".placeholders" ).sortable();
        }, 1000);
    });
    
    $scope.init = function() {
        $scope.doListProcesses();
    };
    
    $scope.init();
}])

.directive("dockable", [function() {
    return {
        restrict: "E",
        templateUrl: "dashboard/dockable.html"
    }
}])

;