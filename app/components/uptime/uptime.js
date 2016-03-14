'use strict';

angular.module('myApp.uptime', [
  'myApp.uptime.uptime-formatter-filter',
  'myApp.uptime.uptime-directive'
])

.value('format', 'dd/MM/yy HH:mm:ss');