angular.module('apf.containers.routesModule').controller('containers.routesController',
  ['$rootScope', '$scope', '$resource', 'ListUtils',
  function ($rootScope, $scope, $resource, listUtils) {
    'use strict';

    var filterChange = function (filters) {
      $rootScope.routesViewFilters = filters;
      $scope.routes = listUtils.applyFilters($scope.allRoutes, $scope.toolbarConfig.filterConfig);
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
      listUtils.sortList($scope.routes, sortId, $scope.sortConfig.isAscending);
    };

    $scope.listId = 'containersRoutesList';

    $scope.columns = [
      listUtils.nameColumn,
      listUtils.uptimeColumn,
      listUtils.memoryMBUsageColumn,
      listUtils.containersInfoColumn,
      listUtils.imagesInfoColumn,
      listUtils.servicesInfoColumn
    ];

    $scope.sortConfig = {
      fields: [
        listUtils.nameSort,
        listUtils.uptimeSort,
        listUtils.memoryUsageSort,
        listUtils.containersSort,
        listUtils.imagesSort,
        listUtils.servicesSort
      ],
      onSortChange: sortChange
    };

    $scope.toolbarConfig = {
      filterConfig: filterConfig,
      sortConfig: $scope.sortConfig
    };

    if ($rootScope.routesViewFilters) {
      $scope.toolbarConfig.filterConfig.appliedFilters = $rootScope.routesViewFilters;
    }

    $scope.listConfig = {
      selectItems: false,
      multiSelect: false,
      selectionMatchProp: 'name',
      selectedItems: [],
      rowHeight: 64,
      checkDisabled: false
    };

    //Get the routes data
    $scope.routesLoaded = false;
    $resource('mock_data/containers/routes/all').get(function (data) {
      $scope.allRoutes = data.data;
      $scope.allRoutes.forEach(function (route) {
        route.memoryUsageData = {
          used: route.memoryUsed,
          total: route.memoryTotal
        };
        route.containersInfo = {
          name: "Containers",
          count: route.containersCount,
          iconClass: "fa fa-cube"
        };
        route.imagesInfo = {
          name: "Images",
          count: route.imagesCount,
          iconClass: "pficon-image"
        };
        route.servicesInfo = {
          name: "Services",
          count: route.servicesCount,
          iconClass: "pficon-service"
        };
      });
      $scope.routes = listUtils.applyFilters($scope.allRoutes, $scope.toolbarConfig.filterConfig);
      $scope.routesLoaded = true;
    });
  }
]);
