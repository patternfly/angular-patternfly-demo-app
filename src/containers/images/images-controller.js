angular.module('apf.containers.imagesModule').controller('containers.imagesController',
  ['$rootScope', '$scope', '$resource', 'ListUtils',
    function ($rootScope, $scope, $resource, listUtils) {
      'use strict';

      //Get the images data
      $scope.imagesLoaded = false;
      $resource('mock_data/containers/images/empty').get(function (data) {
        $scope.allImages = data.data;

        $scope.images = $scope.allImages;

        $scope.imagesLoaded = true;
      });
    }
  ]);
