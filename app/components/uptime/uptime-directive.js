'use strict';

angular.module('myApp.uptime.uptime-directive', [])

.directive('upTime', ['$interval', function($interval) {
    return {
        link: function(scope, element, attrs) {
            var upTime,
                timeoutId;
            
            function updateTime() {
                var result = '---';
                
                if (upTime !== undefined && upTime != '') {
                    var date_now = new Date().getTime();
                    var last_date = Date.parse(upTime);
                    
                    var seconds = Math.floor((date_now - upTime)/1000);
                    var minutes = Math.floor(seconds/60);
                    var hours = Math.floor(minutes/60);
                    var days = Math.floor(hours/24);
                    
                    hours = hours-(days*24);
                    minutes = minutes-(days*24*60)-(hours*60);
                    seconds = seconds-(days*24*60*60)-(hours*60*60)-(minutes*60);
                    
                    if (days > 0) {
                        hours = hours+(days*24);
                    }
                    
                    result = (hours < 10 ? '0' + hours : hours) + 
                        ':' + 
                        (minutes < 10 ? '0' + minutes : minutes) + 
                        ':' + 
                        (seconds < 10 ? '0' + seconds : seconds);
                    
                    //if (days > 0) {
                    //    result = days + ' d ' + result;
                    //}
                }
                
                element.text(result);
            }
            
            scope.$watch(attrs.upTime, function(value) {
                upTime = value;
                updateTime();
            });

            element.on('$destroy', function() {
                $interval.cancel(timeoutId);
            });

            timeoutId = $interval(function() {
                updateTime();
            }, 1000);
        }
    };
}])

;