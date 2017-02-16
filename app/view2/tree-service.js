(function () {
  'use strict';

  angular
    .module('myApp.treeservice', [])
    .factory('treeservice', ['$http','$q', treeservice]);

  function treeservice($http,$q) {
    var service = {
      getFolders: getFolders
    };

    return service;

    function getFolders(path) {
      var defer =$q.defer();
      return $http.get('api/' + path + '.json')
        .success(function(data){
            defer.resolve(data);
        });
      return defer.promise;
    }

  }
})();


