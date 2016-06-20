
angular.module('apf.containersModule',
  ['apf.containers.projectsModule',
   'apf.containers.podsModule',
   'apf.containers.routesModule',
    'apf.containers.buildsModule',
    'apf.containers.imagesModule',
    'apf.containers.servicesModule',
   'apf.containers.nodesModule',
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
      .when('/compute/containers/nodes', {
        templateUrl: 'src/containers/nodes/nodes.html',
        controller: 'containers.nodesController'
      })
      .when('/compute/containers/routes', {
        templateUrl: 'src/containers/routes/routes.html',
        controller: 'containers.routesController'
      })
      .when('/compute/containers/images', {
        templateUrl: 'src/containers/images/images.html',
        controller: 'containers.imagesController'
      })
      .when('/compute/containers/builds', {
        templateUrl: 'src/containers/builds/builds.html',
        controller: 'containers.buildsController'
      })
      .when('/compute/containers/services', {
        templateUrl: 'src/containers/services/services.html',
        controller: 'containers.servicesController'
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
