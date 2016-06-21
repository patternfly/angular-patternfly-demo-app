angular.module('apf.containers.providersModule').controller('containers.deployProviderCDNChannelController',
  ['$rootScope', '$scope', '$timeout', '$document',
  function ($rootScope, $scope, $timeout, $document) {
    'use strict';

    var firstShow = true;

    var validString = function (value) {
      return angular.isDefined(value) && value.length > 0;
    };

    $scope.reviewTemplate = "src/containers/providers/deploy-provider/deploy-provider-details-cdn-review.html";

    $scope.onCdnShow = function () {
      if (firstShow) {
        $scope.data.cdnEnabled = false;
        $scope.data.rhnUsername = '';
        $scope.data.rhnPassword = '';
        $scope.data.rhnSKU = '';
        $scope.data.specifySatelliteUrl = false;
        $scope.data.rhnSatelliteUrl = '';
        firstShow = false;
        $scope.validateForm();
      }
      $timeout(function () {
        if ($scope.data.cdnEnabled) {
          $document[0].getElementById('rhn-user-name').focus();
        }
      }, 200);
    };

    $scope.validateForm = function () {
      $scope.deploymentDetailsCDNComplete = !$scope.data.cdnEnabled || validString($scope.data.rhnUsername) &&
        validString($scope.data.rhnPassword) &&
        validString($scope.data.rhnSKU) &&
        (!$scope.data.specifySatelliteUrl || validString($scope.data.rhnSatelliteUrl));
    };
  }
]);
