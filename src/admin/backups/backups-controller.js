angular.module('apf.admin.backupsModule').controller('admin.backupsController',
  ['$rootScope', '$scope', '$resource', 'ListUtils',
    function ($rootScope, $scope, $resource, listUtils) {
      'use strict';

      //Get the builds data
      $scope.backupsLoaded = false;
      $resource('mock_data/admin/backups/empty').get(function (data) {
        $scope.allBackups = data.data;

        $scope.backups = $scope.allBackups;

        $scope.backupsLoaded = true;
      });
    }
  ]);
