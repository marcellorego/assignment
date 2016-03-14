(function(angular) {

    'use strict';

    angular.module('myApp.uptime.uptime-formatter-filter', [])

    .filter('uptimeFormatter', ['format', 'dateFilter', function(format, dateFilter) {
    return function(text) {
        var timeUp = new Date(text);
        var result;
        try {
            result = dateFilter(timeUp, format);
        } catch (e) {
            result = e.toString();
        }
        return result;
    };
    }]);

})(window.angular);