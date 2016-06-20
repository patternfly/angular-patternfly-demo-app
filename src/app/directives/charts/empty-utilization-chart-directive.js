angular.module('apf.charts').directive('emptyUtilizationChart', function () {
  'use strict';
  return {
    restrict: 'A',
    scope: {
      title: '@'
    },
    templateUrl: 'src/app/directives/charts/empty-utilization-chart.html'
  };
});
