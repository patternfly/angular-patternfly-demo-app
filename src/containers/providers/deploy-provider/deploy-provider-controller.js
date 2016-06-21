angular.module('apf.containers.providersModule').controller('containers.deployProviderController',
  ['$rootScope', '$scope', '$timeout', 'apf.notificationService',
  function ($rootScope, $scope, $timeout, notificationService) {
    'use strict';

    var initializeDeploymentWizard = function () {
      $scope.deployProviderReady = false;
      $scope.deployComplete = false;
      $scope.deployInProgress = false;
      $scope.deploySuccess = false;
      $scope.deployFailed = false;

      $scope.data = {
        providerName: '',
        providerType: 'openshiftOrigin',
        provisionOn: 'existingVms',
        masterCount: 0,
        nodeCount: 0,
        infraNodeCount: 0,
        cdnConfigType: 'satellite',
        authentication: {
          mode: 'all'
        }
      };

      $timeout(function () {
        $scope.data.providers = [
          {
            id: 1,
            name: 'Existing Provider 1'
          },
          {
            id: 2,
            name: 'Existing Provider 2'
          },
          {
            id: 3,
            name: 'Existing Provider 3'
          },
          {
            id: 4,
            name: 'Existing Provider 4'
          }
        ];

        $scope.data.nodeCreationTemplates = [
          {
            id: 1,
            name: 'Existing template 1'
          },
          {
            id: 2,
            name: 'Existing template 2'
          },
          {
            id: 3,
            name: 'Existing template 3'
          },
          {
            id: 4,
            name: 'Existing template 4'
          }
        ];

        $scope.deployProviderReady = true;
      }, 5000);

      $scope.deploymentDetailsGeneralComplete = false;
      $scope.deployComplete = false;
      $scope.deployInProgress = false;
      $scope.nextButtonTitle = "Next >";
    };

    var startDeploy = function () {
      var notificationData = {
        id: Math.floor((Math.random() * 100000) + 1),
        status: 'info',
        message: "New provider deployment '" + $scope.data.providerName + "' is in progress.",
        inProgress: true,
        percentComplete: 0,
        startTime: (new Date()).getTime(),
        endTime: undefined
      };

      var count = 0;
      var updateProgress = function () {
        var showToast = false;

        count++;
        if (count < 10) {
          notificationData.percentComplete = count * 10;
        } else {
          notificationData.status = 'success';
          notificationData.message = "New provider '" + $scope.data.providerName + "' deployed successfully.";
          notificationData.inProgress = false;
          notificationData.percentComplete = 100;
          notificationData.endTime = (new Date()).getTime();
          showToast = true;
        }

        notificationService.updateNotification('task', notificationData.status, notificationData.message, notificationData, notificationData.id, showToast);

        if (count < 10) {
          $timeout(updateProgress, 10000);
        }
      };

      $scope.deployInProgress = true;
      notificationService.addNotification('task', notificationData.status, notificationData.message, notificationData, notificationData.id);
      $timeout(updateProgress, 10000);
    };

    $scope.data = {};
    $scope.nodeData = {
      allNodes: [],
      filteredNodes: [],
      providerVMs: [],
      newVMs: [],
      userDefinedVMs: []
    };

    $scope.nextCallback = function (step) {
      if (step.stepId === 'review-summary') {
        startDeploy();
      }
      return true;
    };
    $scope.backCallback = function (step) {
      return true;
    };

    $scope.$on("wizard:stepChanged", function (e, parameters) {
      if (parameters.step.stepId === 'review-summary') {
        $scope.nextButtonTitle = "Deploy";
      } else if (parameters.step.stepId === 'review-progress') {
        $scope.nextButtonTitle = "Close";
      } else {
        $scope.nextButtonTitle = "Next >";
      }
    });

    $scope.cancelDeploymentWizard = function () {
      $rootScope.$emit('deployProvider.done', 'cancel');
    };

    $scope.finishedWizard = function () {
      if ($scope.deploySuccess) {
        $rootScope.$emit('deployProvider.done', 'done');
      } else {
        $rootScope.$emit('deployProvider.done', 'error');
      }
      return true;
    };

    initializeDeploymentWizard();
  }
]);
