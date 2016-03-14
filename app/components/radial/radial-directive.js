'use strict';

angular.module('myApp.radial.radial-directive', [])

.directive("radialChart", ['$timeout', function($timeout) {
    return {
        restrict: "A",
        scope: {
            "width": '=',
            "height": '=',
            "value" : '=',
            "size" : '='
        },
        //template: '<svg width="50" height="50"></svg>',
        link: function($scope, elem, attrs) {
            
            $timeout(function() {
               
                var width = $scope.width;
                var height = $scope.height;

                var data = [{
                    value: $scope.value, 
                    size: $scope.size, 
                    label: "", 
                    update: function(value) { 
                        return value; 
                    }
                }];

                var arc = d3.svg.arc()
                    .innerRadius(width / 2 - 10)
                    .outerRadius(width / 2 - 5)
                    .startAngle(0)
                    .endAngle(function(d) { 
                        return (d.value / d.size) * 2 * Math.PI; 
                    });
                
                var id = '#' + elem.attr('id');
                
                var svg = d3.select(id)
                    .append("svg")
                    .attr("width", width)
                    .attr("height", height);

                var field = svg.selectAll(".field")
                    .data(data)
                    .enter()
                    .append("g")
                    .attr("transform", function(d, i) { 
                        return "translate(" + (i * 2 + 1) / 2 * width + "," + height / 2 + ")"; 
                    })
                    .attr("class", "field");

                field.append("path")
                    .attr("class", "path path--background")
                    .attr("d", arc);

                var path = field.append("path")
                    .attr("class", "path path--foreground");

                var label = field.append("text")
                    .attr("class", "label")
                    .attr("dy", ".35em");

                var arcTween = function arcTween(b) {
                    var i = d3.interpolate({value: b.previous}, b);
                    return function(t) {
                        return arc(i(t));
                    };
                }                
               
                field
                    .each(function(d) { d.previous = d.value, d.value = d.update($scope.value); });

                path.transition()
                    .ease("elastic")
                    .duration(750)
                    .attrTween("d", arcTween);

                label
                    .text(function(d) { return d.value + d.label; });
            });
            
        },
        controller: ['$scope', '$element', function($scope, $element) {
            
           
                        
        }]
    }
}])

.directive("radial", [function() {
    return {
        restrict: "A",
        scope: {
            "width": '=',
            "height": '=',
            "value" : '=',
            "size" : '='
        },
        /*compile: function compile(tElement, tAttrs, transclude) {
            return {
                pre: function preLink(scope, iElement, iAttrs, controller) {
                     iElement.id = iAttrs.id;
                },
                post: function postLink(scope, iElement, iAttrs, controller) {
                    console.log(iElement.id);
                }
            }
        },*/
        link: function($scope, element, attrs) {
            
            var update = function update(value) {

                var width = $scope.width;
                var height = $scope.height;
                
                /*var data = [{
                    value: $scope.value, 
                    size: $scope.size, 
                    label: "", 
                    update: function(value) { 
                        return value; 
                    }
                }];*/
                
                var radial = d3.selectAll(".radial");
                
                radial.data([16])
                    .enter()
                    .append("p")
                    .text(function(d) { 
                        return "Size " + d + "!"; 
                    });
                
                /*var id = '#' + attrs.id;
                
                var svg = d3.select(id);
                
                svg .append("svg")
                    .attr("width", width)
                    .attr("height", height);*/

                /*var field =  svg.selectAll(".field")
                    .data(data)
                    .enter()
                    .append("g")
                    .attr("transform", function(d, i) { 
                        return "translate(" + (i * 2 + 1) / 2 * width + "," + height / 2 + ")"; 
                    })
                    .attr("class", "field");

                field.append("path")
                    .attr("class", "path path--background")
                    .attr("d", arc);

                var path = field.append("path")
                    .attr("class", "path path--foreground");

                var label = field.append("text")
                    .attr("class", "label")
                    .attr("dy", ".35em");
                
                var arc = d3.svg.arc()
                    .innerRadius(width / 2 - 10)
                    .outerRadius(width / 2 - 5)
                    .startAngle(0)
                    .endAngle(function(d) { 
                        return (d.value / d.size) * 2 * Math.PI; 
                    });
                
                var arcTween = function arcTween(b) {
                    var i = d3.interpolate({value: b.previous}, b);
                    return function(t) {
                        return arc(i(t));
                    };
                };

                field.each(function(d) { 
                    d.previous = d.value, d.value = d.update(value); 
                });

                path.transition()
                    .ease("elastic")
                    .duration(750)
                    .attrTween("d", arcTween);

                label.text(function(d) { 
                    return d.value + d.label; 
                });*/
            };
            
            update($scope.value);            
        },
        controller: ['$scope', '$element', function($scope, $element) {
            
            
        }]
    }
}])

//ng-attr-id="{{ 'object-' + myScopeObject.index }}"