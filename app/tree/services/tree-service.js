(function () {
  'use strict';

  angular
    .module('myApp.treeservice', [])
    .factory('treeservice', ['$http', treeservice]);

  function treeservice($http) {
    var service = {
      getFolders: getFolders
    };

    return service;

    function getFolders(path) {

      return $http.get('api/' + path + '.json');

    }

  }
})();


