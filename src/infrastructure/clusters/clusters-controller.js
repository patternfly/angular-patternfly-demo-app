angular.module('apf.infrastructure.clustersModule').controller('infrastructure.clustersController',
  ['$rootScope', '$scope', '$resource', 'ListUtils',
    function ($rootScope, $scope, $resource, listUtils) {
      'use strict';


      //Get the clusters data
      $scope.clustersLoaded = false;
      $resource('mock_data/infrastructure/clusters/empty').get(function (data) {
        $scope.allClusters = data.data;

        $scope.clusters = $scope.allClusters;

        $scope.clustersLoaded = true;
      });
    }
  ]);
