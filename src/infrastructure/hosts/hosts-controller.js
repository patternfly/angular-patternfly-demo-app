angular.module('apf.infrastructure.hostsModule').controller('infrastructure.hostsController',
  ['$rootScope', '$scope', '$resource', 'ListUtils',
    function ($rootScope, $scope, $resource, listUtils) {
      'use strict';

      //Get the hosts data
      $scope.hostsLoaded = false;
      $resource('mock_data/infrastructure/hosts/empty').get(function (data) {
        $scope.allHosts = data.data;

        $scope.hosts = $scope.allHosts;

        $scope.hostsLoaded = true;
      });
    }
  ]);
