angular.module( 'apf.charts' ).directive('inlineObjectStatus', function () {
  'use strict';
  return {
    restrict: 'A',
    scope: {
      objectType: '=type',
      url: '='
    },
    templateUrl: 'src/app/directives/charts/inline-object-status.html'
  };
});
