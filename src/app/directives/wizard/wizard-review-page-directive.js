angular.module('apf.wizard').directive('apfWizardReviewPage', function () {
  'use strict';
  return {
    restrict: 'A',
    replace: true,
    scope: {
      shown: '=',
      wizardData: "="
    },
    require: '^apf-wizard',
    templateUrl: 'src/app/directives/wizard/wizard-review-page.html',
    controller: function ($scope) {
      $scope.toggleShowReviewDetails = function (step) {
        if (step.showReviewDetails === true) {
          step.showReviewDetails = false;
        } else {
          step.showReviewDetails = true;
        }
      };
      $scope.getSubStepNumber = function (step, substep) {
        return step.getStepDisplayNumber(substep);
      };
      $scope.getReviewSubSteps = function (reviewStep) {
        return reviewStep.getReviewSteps();
      };
      $scope.reviewSteps = [];
      $scope.updateReviewSteps = function (wizard) {
        $scope.reviewSteps = wizard.getReviewSteps();
      };
    },
    link: function ($scope, $element, $attrs, wizard) {
      $scope.$watch('shown', function (value) {
        if (value) {
          $scope.updateReviewSteps(wizard);
        }
      });
    }
  };
});
