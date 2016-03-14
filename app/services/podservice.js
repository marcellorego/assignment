'use strict';

angular.module('myApp.podservice', [])

.service('PodService', ['$http', 'serviceConfig', function ($http, serviceConfig) {
    
    this.listProcesses = function() {
        var config = {
            method: 'GET',
            url: serviceConfig.urlbase + '/listProcesses.json',
            headers: {
                'Content-Type': 'application/json'
            }
        };
        
        var promise = $http(config)
        .then(function (response) {
            return response.data;
        });
        return promise;
    };
    
    this.activeProcess = function() {
        var config = {
            method: 'GET',
            url: serviceConfig.urlbase + '/activeProcesses.json',
            headers: {
                'Content-Type': 'application/json'
            }
        };
        
        var promise = $http(config)
        .then(function (response) {
            return response.data;
        });
        return promise;
    };
}]);