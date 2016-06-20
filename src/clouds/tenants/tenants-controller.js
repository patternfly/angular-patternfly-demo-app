angular.module('apf.clouds.tenantsModule').controller('clouds.tenantsController',
  ['$rootScope', '$scope', '$resource', 'ListUtils', 'ColumnsConfig',
  function ($rootScope, $scope, $resource, listUtils, columnsConfig) {
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
      $rootScope.tenantsViewFilters = filters;
      $scope.tenants = applyFilters($scope.allTenants, $scope.toolbarConfig.filterConfig);
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
      listUtils.sortList($scope.tenants, sortId, $scope.sortConfig.isAscending);
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

    var instancesInfoColumn = {
      columnType: 'objectCount',
      infoField: 'instancesInfo',
      width: columnsConfig.nameColumnWidth
    };

    var providerNameSort = {
      id: 'providerName',
      title:  'Cloud Provider',
      sortType: 'alpha'
    };

    var instancesSort = {
      id: 'instancesCount',
      title:  'Instances',
      sortType: 'numeric'
    };
    $scope.listId = 'tenantsList';

    $scope.columns = [
      listUtils.nameColumn,
      providerNameColumn,
      instancesInfoColumn
    ];

    $scope.sortConfig = {
      fields: [
        listUtils.nameSort,
        providerNameSort,
        instancesSort
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

    //Get the tenants data
    $scope.tenantsLoaded = false;
    $resource('mock_data/cloud/tenants/all').get(function (data) {
      $scope.allTenants = data.data;
      $scope.allTenants.forEach(function (tenant) {
        tenant.instancesInfo = {
          name: "Instances",
          count: tenant.instancesCount,
          iconClass: "pficon-image"
        };
      });

      $scope.tenants = listUtils.applyFilters($scope.allTenants, $scope.toolbarConfig.filterConfig);

      $scope.tenantsLoaded = true;
    });
  }
]);
