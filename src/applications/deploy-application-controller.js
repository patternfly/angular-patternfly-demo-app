angular.module('apf.applicationsModule').controller('deployApplicationController',
  ['$rootScope', '$scope',
  function ($rootScope, $scope) {
    'use strict';

    $scope.newApplication = {
      name: ""
    };

    $scope.cancelDeployDialog = function () {
      $scope.$close();
    };

    $scope.saveDeployDialog = function () {
      if (angular.isDefined($scope.newApplication.name) && ($scope.newApplication.name.length > 0)) {
        $scope.$dismiss($scope.newApplication);
      }
    };
  }
]);
