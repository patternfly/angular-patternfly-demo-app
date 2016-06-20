angular.module ('apf.adminModule',
  ['apf.userAdminModule',
   'apf.admin.backupsModule',
   'apf.admin.automatedTasksModule'
  ])
  .config(['$routeProvider', function ($routeProvider) {
    'use strict';
    $routeProvider
      .when('/admin', {
        redirectTo: '/admin/user-admin'
      })
      .when('/admin/user-admin', {
        redirectTo: '/admin/user-admin/users'
      })
      .when('/admin/user-admin/users', {
        templateUrl: 'src/admin/user-admin/users.html',
        controller: 'userAdmin.usersController'
      })
      .when('/admin/user-admin/groups', {
        templateUrl: 'src/admin/user-admin/groups.html',
        controller: 'userAdmin.groupsController'
      })
      .when('/admin/user-admin/roles', {
        templateUrl: 'src/admin/user-admin/roles.html',
        controller: 'userAdmin.rolesController'
      })
      .when('/admin/backups', {
        templateUrl: 'src/admin/backups/backups.html',
        controller: 'admin.backupsController'
      })
      .when('/admin/automated-tasks', {
        templateUrl: 'src/admin/automated-tasks/automated-tasks.html',
        controller: 'admin.automatedTasksController'
      });
  }]);
