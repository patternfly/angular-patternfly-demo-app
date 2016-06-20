angular.module('apf.charts').directive('emptyTrendsChart', function () {
  'use strict';
  return {
    restrict: 'A',
    scope: {
      chartHeight: '@'
    },
    templateUrl: 'src/app/directives/charts/empty-trends-chart.html'
  };
});
