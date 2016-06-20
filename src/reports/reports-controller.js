angular.module('apf.reportsModule').controller('reportsController',
  ['$rootScope', '$scope', '$resource', '$location', 'ChartsDataMixin', 'ListUtils', 'pfViewUtils',
  function ($rootScope, $scope, $resource, $location, chartsDataMixin, listUtils, pfViewUtils) {
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
      $rootScope.reportsViewFilters = filters;
      $scope.reports = applyFilters($scope.allReports, $scope.toolbarConfig.filterConfig);
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
      listUtils.sortList($scope.reports, sortId, $scope.sortConfig.isAscending);
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

    $scope.listId = 'reportsList';

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

    //Get the reports data
    $scope.reportsLoaded = false;
    $resource('mock_data/reports/empty').get(function (data) {
      $scope.allReports = data.data;
      $scope.allReports.forEach(function (report) {

        report.memoryUsageData = {
          used: report.memoryUsed,
          total: report.memoryTotal
        };

        report.servicesInfo = {
          name: "Services",
          count: report.servicesCount,
          iconClass: "pficon-service"
        };
        report.sessionsInfo = {
          name: "Sessions",
          count: report.sessionsCount,
          iconClass: "pficon-user"
        };
        report.serverGroupsInfo = {
          name: "Server Groups",
          count: report.groupsCount,
          iconClass: "pficon-registry"
        };
      });

      $scope.reports = listUtils.applyFilters($scope.allReports, $scope.toolbarConfig.filterConfig);

      $scope.reportsLoaded = true;
    });
  }
]);
