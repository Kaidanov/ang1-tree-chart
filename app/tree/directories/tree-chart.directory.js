(function () {
    'use strict';

    angular.module('myApp').directive('tree', function() {
    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'tree/templates/tree-chart.html',
        controller: 'TreeCtrl'
    }});
})();