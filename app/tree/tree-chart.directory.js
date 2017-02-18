(function () {
    'use strict';

    angular.module('myApp').directive('tree', function() {
    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'tree/tree-chart.html',
        controller: 'TreeCtrl'
    }});
})();