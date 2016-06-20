angular.module('apf.containers.providersModule').controller('containers.deployProviderReviewController',
  ['$rootScope', '$scope',
  function ($rootScope, $scope) {
    'use strict';

    // Find the data!
    var next = $scope;
    while (angular.isUndefined($scope.data)) {
      next = next.$parent;
      if (angular.isUndefined(next)) {
        $scope.data = {};
      } else {
        $scope.data = next.wizardData;
      }
    }

    $scope.getProviderType = function () {
      var providerType = '';

      if ($scope.data.providerType === 'openshiftOrigin') {
        providerType = "OpenShift Origin";
      } else if ($scope.data.providerType === 'openshiftEnterprise') {
        providerType = "OpenShift Enterprise";
      }
      return providerType;
    };

    $scope.getProviderDescription = function () {
      var description = '';
      var provider;

      if ($scope.data.provisionOn === 'existingVms') {
        provider = $scope.data.providers.find(function (provider) {
          return provider.id === $scope.data.existingProviderId;
        });
        description = 'Use existing VMs from an existing provider: ' + (provider ? provider.name : "None");
      } else if ($scope.data.provisionOn === 'newVms') {
        provider = $scope.data.providers.find(function (provider) {
          return provider.id === $scope.data.newVmProviderId;
        });
        description = 'Use existing VMs from an existing provider: ' + (provider ? provider.name : "None");
      } else if ($scope.data.provisionOn === 'noProvider') {
        description = 'Specify a list of machines to deploy on (No existing provider';
      }
      return description;
    };

    $scope.getMasterCreationTemplate = function () {
      var selectedTemplate = $scope.data.nodeCreationTemplates.find(function (nextTemplate) {
        return nextTemplate.id === $scope.data.masterCreationTemplateId;
      });
      return selectedTemplate ? selectedTemplate.name : "None";
    };

    $scope.getNodeCreationTemplate = function () {
      var selectedTemplate = $scope.data.nodeCreationTemplates.find(function (nextTemplate) {
        return nextTemplate.id === $scope.data.masterCreationTemplateId;
      });
      return selectedTemplate ? selectedTemplate.name : "None";
    };

    $scope.getAuthenticationType = function () {
      if ($scope.data.authentication.mode === 'all') {
        return "Allow All";
      } else if ($scope.data.authentication.mode === 'htPassword') {
        return "HTPassword";
      } else if ($scope.data.authentication.mode === 'ldap') {
        return "LDAP";
      } else if ($scope.data.authentication.mode === 'requestHeader') {
        return "Request Header";
      } else if ($scope.data.authentication.mode === 'openId') {
        return "OpenID Connect";
      } else if ($scope.data.authentication.mode === 'google') {
        return "Google";
      } else if ($scope.data.authentication.mode === 'github') {
        return "GitHub";
      } else {
        return "None";
      }
    };

    $scope.getConfigServerType = function () {
      var serverType = '';

      if ($scope.data.serverConfigType === 'standardNFS') {
        serverType = "Standard NFS Server";
      } else if ($scope.data.serverConfigType === 'integratedNFS') {
        serverType = "Integrated NFS Server";
      } else if ($scope.data.serverConfigType === 'none') {
        serverType = "None";
      }

      return serverType;
    };
  }
]);
