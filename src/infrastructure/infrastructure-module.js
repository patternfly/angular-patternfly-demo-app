
angular.module( 'apf.infrastructureModule',
  ['apf.infrastructure.providersModule'])
  .config(['$routeProvider', function ($routeProvider) {
    'use strict';
    $routeProvider
      .when('/compute/infrastructure', {
        redirectTo: '/dashboard'
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
