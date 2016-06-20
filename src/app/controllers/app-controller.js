angular.module('apf.appModule').controller( 'apf.appController', ['$scope', '$rootScope', '$resource',
  function ($scope, $rootScope, $resource ) {
    'use strict';

    $scope.username = 'Administrator';

    //Navigation should be loaded from a service
    $scope.navigationItems = [];

    $resource('mock_data/vertical-navigation').get(function (data) {
      $scope.navigationItems = data.data;
    });
  }
]);
