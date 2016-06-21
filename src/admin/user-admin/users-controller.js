angular.module('apf.userAdminModule').controller('userAdmin.usersController',
  ['$rootScope', '$scope', '$resource', 'ListUtils', 'ColumnsConfig', 'apf.notificationService', '$timeout',
  function ($rootScope, $scope, $resource, listUtils, columnsConfig, notificationService, $timeout) {
    'use strict';

    var nameColumn = {
      columnType: 'label',
      field: 'username',
      width: columnsConfig.nameColumnWidth
    };

    var nameEmailColumn = {
      columnType: 'labelValues',
      fields: [
        {
          label: 'Name',
          value: 'name'
        },
        {
          label: 'Email',
          value: 'email'
        }

      ],
      titleWidth: 65,
      width: 230
    };
    var roleColumn = {
      columnType: 'labelValues',
      fields: [
        {
          label: 'Role',
          value: 'role'
        },
      ],
      width: columnsConfig.nameColumnWidth
    };

    var groupsInfoColumn = {
      columnType: 'objectCount',
      infoField: 'groupsInfo',
      width: columnsConfig.nameColumnWidth
    };

    var matchesFilter = function (item, filter) {
      var match = true;

      if (filter.id === 'name') {
        match = item.name.match(filter.value) !== null;
      } else if (filter.id === 'username') {
        match = item.username.match(filter.value) !== null;
      } else if (filter.id === 'role') {
        match = item.role.match(filter.value) !== null;
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
      $rootScope.usersViewFilters = filters;
      $scope.users = applyFilters($scope.allUsers, $scope.toolbarConfig.filterConfig);
    };

    var filterConfig = {
      fields: [
        {
          id: 'username',
          title: 'Username',
          placeholder: 'Filter by Username',
          filterType: 'text'
        },
        listUtils.nameFilter,
        {
          id: 'username',
          title: 'Username',
          placeholder: 'Filter by Username',
          filterType: 'text'
        },
        {
          id: 'role',
          title: 'Role',
          placeholder: 'Filter by Role',
          filterType: 'text'
        }
      ],
      resultsCount: 0,
      appliedFilters: [],
      onFilterChange: filterChange
    };

    var sortChange = function (sortId, isAscending) {
      listUtils.sortList($scope.users, sortId, $scope.sortConfig.isAscending);
    };

    var nameSort = {
      id: 'name',
      title:  'Name',
      sortType: 'alpha'
    };

    var usernameSort = {
      id: 'username',
      title:  'Username',
      sortType: 'alpha'
    };

    var roleSort = {
      id: 'role',
      title:  'Role',
      sortType: 'alpha'
    };

    var handleSelectionChange = function () {
      var itemsSelected = $scope.users.find(function (item) {
        return item.selected;
      });
      $scope.actionsConfig.primaryActions[1].isDisabled = !itemsSelected;
      $scope.actionsConfig.primaryActions[2].isDisabled = !itemsSelected;
    };

    var deleteUsers = function () {
      var index;
      var notificationData;

      $scope.users.forEach(function (user) {
        if (user.selected) {
          notificationData = {
            status: 'warning',
            message: 'User "' + user.name + '" had been deleted.'
          };

          notificationService.addNotification('event', notificationData.status, notificationData.message, notificationData);
          index = $scope.allUsers.indexOf(user);
          if (index > -1) {
            $scope.allUsers.splice(index, 1);
          }
        }
      });
      $scope.users = listUtils.applyFilters($scope.allUsers, $scope.toolbarConfig.filterConfig);
      handleSelectionChange();
    };

    $scope.listId = 'usersList';

    $scope.columns = [
      nameColumn,
      nameEmailColumn,
      roleColumn,
      groupsInfoColumn
    ];

    $scope.sortConfig = {
      fields: [
        nameSort,
        usernameSort,
        roleSort
      ],
      onSortChange: sortChange
    };

    $scope.actionsConfig = {
      primaryActions: [
        {
          name: "Add New User",
          title: "Add a new user"
        },
        {
          name: "Edit Users",
          title: "Edit selected users",
          isDisabled: true
        },
        {
          name: "Remove Users",
          title: "Remove selected users",
          isDisabled: true,
          actionFn: deleteUsers,
        }
      ]
    };
    $scope.toolbarConfig = {
      filterConfig: filterConfig,
      sortConfig: $scope.sortConfig,
      actionsConfig: $scope.actionsConfig
    };

    $scope.listConfig = {
      selectItems: false,
      multiSelect: false,
      selectionMatchProp: 'name',
      selectedItems: [],
      onCheckBoxChange: handleSelectionChange,
      checkDisabled: false,
      rowHeight: 64
    };

    //Get the users data
    $scope.usersLoaded = false;
    $resource('mock_data/users/all').get(function (data) {
      $scope.allUsers = data.data;
      $scope.allUsers.forEach(function (user) {
        user.groupsInfo = {
          name: "Groups",
          count: user.groupsCount,
          iconClass: "fa fa-users"
        };
      });

      $scope.users = listUtils.applyFilters($scope.allUsers, $scope.toolbarConfig.filterConfig);

      $scope.usersLoaded = true;
    },
    function () {
      // Log an error
      $scope.usersLoaded = true;
    });
  }
]);
