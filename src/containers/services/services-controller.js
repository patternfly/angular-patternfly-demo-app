angular.module('apf.containers.servicesModule').controller('containers.servicesController',
  ['$rootScope', '$scope', '$resource', 'ListUtils',
  function ($rootScope, $scope, $resource, listUtils) {
    'use strict';

    //Get the services data
    $scope.servicesLoaded = false;
    $resource('mock_data/containers/services/empty').get(function (data) {
      $scope.allServices = data.data;

      $scope.services = $scope.allServices;

      $scope.servicesLoaded = true;
    });
  }
]);
