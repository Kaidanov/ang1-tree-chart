(function () {
  'use strict';

angular.module('myApp.tree', ['ngRoute'])
.controller('TreeCtrl', ['$scope', 'treeservice','chartData',function($scope, treeservice, chartData) {
  $scope.remove = function (scope) {
    scope.remove();
  };

  $scope.toggle = function (scope) {
    scope.toggle();
  };

  $scope.moveLastToTheBeginning = function () {
    var a = $scope.data.pop();
    $scope.data.splice(0, 0, a);
  };

  $scope.chartData=[];

  $scope.toggleCollapsed=function(node){
    node.collapsed=!node.collapsed;
    $scope.getGlyphicon(node);
  }

  $scope.toggleItem = function (scope) {
    var nodeData = scope.$modelValue;
    if (nodeData.hasChildren && nodeData.collapsed){
      $scope.toggleCollapsed(scope.$parent.$modelValue);
      getNodes(nodeData);
    }
    else{
      $scope.toggleCollapsed(nodeData);
    }
    if(nodeData.nodes && nodeData.nodes.length >0) {
      scope.toggle();
    }
  };

  $scope.collapseAll = function () {
    $scope.$broadcast('angular-ui-tree:collapse-all');
    // var els=angular.element(document.querySelector('.glyphicon-folder-open'));
    // els.removeClass('.glyphicon-folder-open').addClass('.glyphicon-folder-close');
  };

  $scope.showPieChart = function(node){
    $scope.chartData = new chartData();
    if(node.files.length>0){
      for (var i = 0; i < node.files.length; i++) {
        $scope.chartData.add($scope.chartData.item(node.files[i].type,node.files[i].size));
      }
      $scope.dataChart= $scope.chartData.getjson();
      $scope.options.title.text = "Content ( " + $scope.chartData.totalSize + " MB ) ";

    }
  }

  $scope.expandAll = function () {
    $scope.$broadcast('angular-ui-tree:expand-all');
  };

  //getting the data async
  angular.element(document).ready(function () {
    activate();
  });
  $scope.data = [];
  function activate() {
    getFolders('server');
  }

  function getFolders(path) {
    treeservice.getFolders(path).then(function (result) {
      $scope.data = result.data;
      angular.forEach($scope.data, function(value, key){
        value.collapsed = true;
        $scope.getGlyphicon(value);
      });
    });
  }

  $scope.getGlyphicon=function(scope) {
    if(!scope.collapsed ){
      scope.myDynamicClass= 'glyphicon glyphicon-folder-open';
      scope.plusMinusClass = 'glyphicon glyphicon-minus';
    }
    else if(scope.collapsed || !scope.hasChildren){
      scope.myDynamicClass= 'glyphicon glyphicon-folder-close';
      scope.plusMinusClass = 'glyphicon glyphicon-plus';
    }
    else {
      scope.myDynamicClass= 'glyphicon glyphicon-folder-close';
      scope.plusMinusClass = 'glyphicon glyphicon-plus';
    }
  }

  function getNodes(nodeData) {

    if (nodeData.hasChildren) {
      //if((typeof nodeData.nodes === 'undefined' || !nodeData.nodes) || nodeData.nodes.length == 0 ) {
      treeservice.getFolders(nodeData.id).then(function (result) {
        nodeData.nodes = result.data;
        angular.forEach(nodeData.nodes, function(value, key){
          value.collapsed = true;
          $scope.getGlyphicon(value);
        });

      });
    }
  }

  //chart handle
  $scope.options = {
    chart: {
      type: 'pieChart',
      height: 500,
      x: function(d){return d.key;},
      y: function(d){return d.y;},
      showLabels: true,
      duration: 500,
      labelThreshold: 0.01,
      labelSunbeamLayout: true,
      legend: {
        margin: {
          top: 5,
          right: 35,
          bottom: 5,
          left: 0
        }
      }
    },
    title: {
      enable: true,
      text: ""
    }
  };



}]);
})();
