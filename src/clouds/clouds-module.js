
angular.module( 'apf.cloudsModule',
  ['apf.clouds.tenantsModule', 'apf.clouds.volumesModule'])
  .config(['$routeProvider', function ($routeProvider) {
    'use strict';
    $routeProvider
      .when('/compute/clouds/tenants', {
        templateUrl: 'src/clouds/tenants/tenants.html',
        controller: 'clouds.tenantsController'
      })
      .when('/compute/clouds/volumes', {
        templateUrl: 'src/clouds/volumes/volumes.html',
        controller: 'clouds.volumesController'
      });
  }]);
