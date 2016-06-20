
angular.module( 'apf.reportsModule',
  [])
  .config(['$routeProvider', function ($routeProvider) {
    'use strict';
    $routeProvider
      .when('/reports', {
        templateUrl: 'src/reports/reports.html',
        controller: 'reportsController'
      });
  }]);
