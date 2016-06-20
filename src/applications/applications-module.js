
angular.module( 'apf.applicationsModule',
  [])
  .config(['$routeProvider', function ($routeProvider) {
    'use strict';
    $routeProvider
      .when('/applications', {
        templateUrl: 'src/applications/applications.html',
        controller: 'applicationsController'
      });
  }]);
