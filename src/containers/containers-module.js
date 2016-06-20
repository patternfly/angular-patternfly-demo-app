
angular.module( 'apf.containersModule',
  ['apf.containers.projectsModule',
   'apf.containers.podsModule',
   'apf.containers.providersModule',
   'apf.containers.dashboardModule'])
  .config(['$routeProvider', function ($routeProvider) {
    'use strict';
    $routeProvider
      .when('/compute/containers/dashboard', {
        templateUrl: 'src/containers/dashboard/dashboard.html',
        controller: 'containers.dashboardController'
      })
      .when('/compute/containers/projects', {
        templateUrl: 'src/containers/projects/projects.html',
        controller: 'containers.projectsController'
      })
      .when('/compute/containers/projects/:id', {
        templateUrl: 'src/containers/projects/project.html',
        controller: 'containers.projectController'
      })
      .when('/compute/containers/providers', {
        templateUrl: 'src/containers/providers/providers.html',
        controller: 'containers.providersController'
      })
      .when('/compute/containers/providers/:id', {
        templateUrl: 'src/containers/providers/providers.html',
        controller: 'containers.providersController'
      })
      .when('/compute/containers/providers/provider/:id', {
        templateUrl: 'src/containers/providers/provider.html',
        controller: 'containers.providerController'
      })
      .when('/compute/containers/pods', {
        templateUrl: 'src/containers/pods/pods.html',
        controller: 'containers.podsController'
      })
      .when('/compute/containers/pods/:id', {
        templateUrl: 'src/containers/pods/pod.html',
        controller: 'containers.podController'
      });
  }]);
