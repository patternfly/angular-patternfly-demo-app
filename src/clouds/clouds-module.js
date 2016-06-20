
angular.module( 'apf.cloudsModule',
  [])
  .config(['$routeProvider', function ($routeProvider) {
    'use strict';
    $routeProvider
      .when('/compute/clouds', {
        templateUrl: 'src/infrastructure/providers/provider.html',
        controller: 'infrastructure.providerController'
      });
  }]);
