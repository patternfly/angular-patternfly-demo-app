angular.module('apf.containers.providersModule').controller('containers.deployProviderConfigStorageController',
  ['$rootScope', '$scope', '$timeout', '$document',
  function ($rootScope, $scope, $timeout, $document) {
    'use strict';

    var firstShow = true;

    var validString = function (value) {
      return angular.isDefined(value) && value.length > 0;
    };

    $scope.reviewTemplate = "src/containers/providers/deploy-provider/deploy-provider-config-storage-review.html";

    $scope.onShow = function () {
      if (firstShow) {
        $scope.data.storageType = 'none';
        $scope.data.nfsStorageServer = '';
        $scope.data.nfsStoragePath = '';
        firstShow = false;
      }
      $scope.validateForm();

      $timeout(function () {
        if ($scope.data.storageType === 'nfs') {
          $document[0].getElementById('nfs-storage-server').focus();
        }
      }, 200);
    };

    $scope.validateForm = function () {
      $scope.configStorageComplete =
        $scope.data.storageType !== 'nfs' ||
        (validString($scope.data.nfsStorageServer) &&
         validString($scope.data.nfsStoragePath));
    };
  }
]);
