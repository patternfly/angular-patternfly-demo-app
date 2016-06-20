angular.module('apf.containers.buildsModule').controller('containers.buildsController',
  ['$rootScope', '$scope', '$resource', 'ListUtils',
    function ($rootScope, $scope, $resource, listUtils) {
      'use strict';

      //Get the builds data
      $scope.buildsLoaded = false;
      $resource('mock_data/containers/builds/empty').get(function (data) {
        $scope.allBuilds = data.data;

        $scope.builds = $scope.allBuilds;

        $scope.buildsLoaded = true;
      });
    }
  ]);
