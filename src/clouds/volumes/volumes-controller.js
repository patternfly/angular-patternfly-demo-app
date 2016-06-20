angular.module('apf.clouds.volumesModule').controller('clouds.volumesController',
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
      $rootScope.volumesViewFilters = filters;
      $scope.volumes = applyFilters($scope.allVolumes, $scope.toolbarConfig.filterConfig);
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
      listUtils.sortList($scope.volumes, sortId, $scope.sortConfig.isAscending);
    };

    var sizeColumn = {
      columnType: 'labelValues',
      fields: [
        {
          label: 'Size (GB)',
          value: 'sizeInGB'
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

    var zoneColumn = {
      columnType: 'labelValues',
      fields: [
        {
          label: 'Availability Zone',
          value: 'zone'
        },
      ],
      width: 190
    };

    var providerNameColumn = {
      columnType: 'labelValues',
      fields: [
        {
          label: 'Cloud Provider',
          value: 'providerName'
        },
      ],
      width: 190
    };

    var providerNameSort = {
      id: 'providerName',
      title:  'Cloud Provider',
      sortType: 'alpha'
    };

    $scope.listId = 'volumesList';

    $scope.columns = [
      listUtils.nameColumn,
      sizeColumn,
      statusColumn,
      zoneColumn,
      providerNameColumn
    ];

    $scope.sortConfig = {
      fields: [
        listUtils.nameSort,
        providerNameSort
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
      rowHeight: 32
    };

    //Get the volumes data
    $scope.volumesLoaded = false;
    $resource('mock_data/cloud/volumes/all').get(function (data) {
      $scope.allVolumes = data.data;

      $scope.volumes = listUtils.applyFilters($scope.allVolumes, $scope.toolbarConfig.filterConfig);
      $scope.volumesLoaded = true;
    });
  }
]);
