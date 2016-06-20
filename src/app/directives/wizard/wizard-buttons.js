function wizardButtonDirective (action) {
  'use strict';

  angular.module('apf.wizard')
    .directive(action, function () {
      return {
        restrict: 'A',
        replace: false,
        require: '^apf-wizard',
        scope: {
          callback: "=?"
        },
        link: function ($scope, $element, $attrs, wizard) {
          $element.on("click", function (e) {
            e.preventDefault();
            $scope.$apply(function () {
              $scope.$eval($attrs[action]);
              wizard[action.replace("apfWiz", "").toLowerCase()]($scope.callback);
            });
          });
        }
      };
    });
}

wizardButtonDirective('apfWizNext');
wizardButtonDirective('apfWizPrevious');
wizardButtonDirective('apfWizFinish');
wizardButtonDirective('apfWizCancel');
wizardButtonDirective('apfWizReset');
