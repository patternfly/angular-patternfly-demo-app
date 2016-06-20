
angular.module( 'apf.infrastructureModule',
  ['apf.infrastructure.providersModule', 'apf.infrastructure.clustersModule', 'apf.infrastructure.hostsModule'])
  .config(['$routeProvider', function ($routeProvider) {
    'use strict';
    $routeProvider
      .when('/compute/infrastructure', {
        redirectTo: '/dashboard'
      })
      .when('/compute/infrastructure/clusters', {
        templateUrl: 'src/infrastructure/clusters/clusters.html',
        controller: 'infrastructure.clustersController'
      })
      .when('/compute/infrastructure/hosts', {
        templateUrl: 'src/infrastructure/hosts/hosts.html',
        controller: 'infrastructure.hostsController'
      })
      .when('/compute/infrastructure/providers', {
        templateUrl: 'src/infrastructure/providers/providers.html',
        controller: 'infrastructure.providersController'
      })
      .when('/compute/infrastructure/providers/provider/:id', {
        templateUrl: 'src/infrastructure/providers/provider.html',
        controller: 'infrastructure.providerController'
      });
  }]);
