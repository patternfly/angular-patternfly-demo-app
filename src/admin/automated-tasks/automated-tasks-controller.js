angular.module('apf.admin.automatedTasksModule').controller('admin.automatedTasksController',
  ['$rootScope', '$scope', '$resource', 'ListUtils',
  function ($rootScope, $scope, $resource, listUtils) {
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
      $rootScope.automatedTasksViewFilters = filters;
      $scope.automatedTasks = applyFilters($scope.allAutomatedTasks, $scope.toolbarConfig.filterConfig);
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
      listUtils.sortList($scope.automatedTasks, sortId, $scope.sortConfig.isAscending);
    };

    var lastRunColumn = {
      columnType: 'labelValues',
      fields: [
        {
          label: 'Last Run',
          value: 'lastRun'
        },
      ],
      width: 190
    };

    var statusColumn = {
      columnType: 'labelValues',
      fields: [
        {
          label: 'Status',
          value: 'status'
        },
      ],
      width: 190
    };

    var lastRunSort = {
      id: 'lastRunOrder',
      title:  'Last Run',
      sortType: 'numeric'
    };

    var statusSort = {
      id: 'status',
      title:  'Status',
      sortType: 'alpha'
    };

    $scope.listId = 'automatedTasksList';

    $scope.columns = [
      listUtils.nameColumn,
      lastRunColumn,
      statusColumn
    ];

    $scope.sortConfig = {
      fields: [
        listUtils.nameSort,
        lastRunSort,
        statusSort
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

    //Get the automatedTasks data
    $scope.automatedTasksLoaded = false;
    $resource('mock_data/admin/automated-tasks/all').get(function (data) {
      $scope.allAutomatedTasks = data.data;

      $scope.automatedTasks = listUtils.applyFilters($scope.allAutomatedTasks, $scope.toolbarConfig.filterConfig);

      $scope.automatedTasksLoaded = true;
    });
  }
]);
