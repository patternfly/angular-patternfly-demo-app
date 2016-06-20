angular.module('apf.containers.nodesModule').controller('containers.nodesController',
  ['$rootScope', '$scope', '$resource', 'ListUtils',
  function ($rootScope, $scope, $resource, listUtils) {
    'use strict';

    var filterChange = function (filters) {
      $rootScope.nodesViewFilters = filters;
      $scope.nodes = listUtils.applyFilters($scope.allNodes, $scope.toolbarConfig.filterConfig);
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
      listUtils.sortList($scope.nodes, sortId, $scope.sortConfig.isAscending);
    };

    $scope.listId = 'containersNodesList';

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

    if ($rootScope.nodesViewFilters) {
      $scope.toolbarConfig.filterConfig.appliedFilters = $rootScope.nodesViewFilters;
    }

    $scope.listConfig = {
      selectItems: false,
      multiSelect: false,
      selectionMatchProp: 'name',
      selectedItems: [],
      rowHeight: 64,
      checkDisabled: false
    };

    //Get the nodes data
    $scope.nodesLoaded = false;
    $resource('mock_data/containers/nodes/all').get(function (data) {
      $scope.allNodes = data.data;
      $scope.allNodes.forEach(function (node) {
        node.memoryUsageData = {
          used: node.memoryUsed,
          total: node.memoryTotal
        };
        node.containersInfo = {
          name: "Containers",
          count: node.containersCount,
          iconClass: "fa fa-cube"
        };
        node.imagesInfo = {
          name: "Images",
          count: node.imagesCount,
          iconClass: "pficon-image"
        };
        node.servicesInfo = {
          name: "Services",
          count: node.servicesCount,
          iconClass: "pficon-service"
        };
      });
      $scope.nodes = listUtils.applyFilters($scope.allNodes, $scope.toolbarConfig.filterConfig);
      $scope.nodesLoaded = true;
    });
  }
]);
