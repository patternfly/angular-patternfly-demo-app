angular.module('apf.applicationsModule').controller('applicationsController',
  ['$rootScope', '$scope', '$resource', '$location', 'ListUtils', '$document', 'apf.notificationService', '$modal', '$timeout',
  function ($rootScope, $scope, $resource, $location, listUtils, $document, notificationService, $modal, $timeout) {
    'use strict';

    var matchesFilter = function (item, filter) {
      var match = true;

      if (filter.id === 'name') {
        match = item.name.match(filter.value) !== null;
      }
      return match;
    };

    var matchesFilters = function (item, filters) {
      var matches = true;

      filters.forEach(function (filter) {
        if (!matchesFilter(item, filter)) {
          matches = false;
        }
      });
      return matches;
    };

    var applyFilters = function (items, filterConfig) {
      var filteredItems = items;
      if (filterConfig.appliedFilters && filterConfig.appliedFilters.length > 0) {
        filteredItems = [];
        items.forEach(function (item) {
          if (matchesFilters(item, filterConfig.appliedFilters)) {
            filteredItems.push(item);
          }
        });
      }

      filterConfig.resultsCount = filteredItems.length;
      return filteredItems;
    };

    var filterChange = function (filters) {
      $rootScope.applicationsViewFilters = filters;
      $scope.applications = applyFilters($scope.allApplications, $scope.toolbarConfig.filterConfig);
    };

    var filterConfig = {
      fields: [
        listUtils.nameFilter
      ],
      resultsCount: 0,
      appliedFilters: [],
      onFilterChange: filterChange
    };

    var sortChange = function (sortId, isAscending) {
      listUtils.sortList($scope.applications, sortId, $scope.sortConfig.isAscending);
    };

    var sessionsSort = {
      id: 'sessionsCount',
      title:  'Sessions',
      sortType: 'numeric'
    };

    var groupsSort = {
      id: 'groupsCount',
      title:  'Server Groups',
      sortType: 'numeric'
    };

    $scope.listId = 'applicationsList';

    $scope.columns = [
      listUtils.nameColumn,
      listUtils.cpuUsedPercentColumn,
      listUtils.memoryMBUsageColumn,
      listUtils.sessionsInfoColumn,
      listUtils.servicesInfoColumn,
      listUtils.serverGroupsInfoColumn
    ];

    $scope.sortConfig = {
      fields: [
        listUtils.nameSort,
        listUtils.cpuPercentUsedSort,
        listUtils.memoryUsageSort,
        sessionsSort,
        listUtils.servicesSort,
        groupsSort
      ],
      onSortChange: sortChange
    };

    $scope.deployApplication = function () {
      var modalInstance = $modal.open({
        animation: true,
        backdrop: 'static',
        templateUrl: 'src/applications/deploy-application.html',
        controller: 'deployApplicationController',
        size: 'md'
      });

      modalInstance.rendered.then(function () {
        $document[0].getElementById('new_application-name').focus();
      });

      modalInstance.result.then(function () {
      }, function (newApplication) {
        var notificationData = {
          id: Math.floor((Math.random() * 100000) + 1),
          status: 'info',
          message: "New application deployment '" + newApplication.name + "' is in progress.",
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
            notificationData.message = "New application '" + newApplication.name + "' deployed successfully.";
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
        notificationService.addNotification('task', notificationData.status, notificationData.message, notificationData, notificationData.id);
        $timeout(updateProgress, 10000);
      }, function (reason) {
      });

    };

    $scope.toolbarConfig = {
      filterConfig: filterConfig,
      sortConfig: $scope.sortConfig
    };

    $scope.listConfig = {
      selectItems: false,
      multiSelect: false,
      selectionMatchProp: 'name',
      selectedItems: [],
      checkDisabled: false,
      rowHeight: 64
    };

    //Get the applications data
    $scope.applicationsLoaded = false;
    $resource('mock_data/applications/empty').get(function (data) {
      $scope.allApplications = data.data;
      $scope.allApplications.forEach(function (application) {

        application.memoryUsageData = {
          used: application.memoryUsed,
          total: application.memoryTotal
        };

        application.servicesInfo = {
          name: "Services",
          count: application.servicesCount,
          iconClass: "pficon-service"
        };
        application.sessionsInfo = {
          name: "Sessions",
          count: application.sessionsCount,
          iconClass: "pficon-user"
        };
        application.serverGroupsInfo = {
          name: "Server Groups",
          count: application.groupsCount,
          iconClass: "pficon-registry"
        };
      });

      $scope.applications = listUtils.applyFilters($scope.allApplications, $scope.toolbarConfig.filterConfig);

      $scope.applicationsLoaded = true;
    });
  }
]);
